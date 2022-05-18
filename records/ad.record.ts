import { FieldPacket } from "mysql2";
import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import { v4 as uuid } from 'uuid';
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";



type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity{

    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity){
        if(!obj.name || obj.name.length > 100){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków');
        }

        if(obj.description.length > 1000){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 1000 znaków');
        }

        if(obj.price < 0 || obj.price > 9999999){
            throw new ValidationError('Cena nie może być mniejsza niż zero  ani przekraczać 9999999');
        }
        //todo check if url is valid
        if(!obj.url || obj.url.length > 100){
            throw new ValidationError('Link ogłoszenia nie może być pusty ani przekraczać 100 znaków');
        }
        if( typeof obj.lat !== "number" || typeof obj.lon !== "number"){
            throw new ValidationError('Nie można zlokalizować ogłoszenia');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;

    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults

        return results.length === 0 ? null : new AdRecord(results[0])
    }

    static async findAll(name:string): Promise<SimpleAdEntity[]>{
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search",{
            search: `%${name}%`
        }) as AdRecordResults;

        return results.map(result => {
            const {
                id, lat, lon
            } = result;
            return {
                id, lat, lon
            }
        });
    }

    async insert(): Promise <string> {
        if(!this.id){
            this.id = uuid();
        }
        await pool.execute("INSERT INFO `ads`(`id`,`name`, `description`, `price`, `url`, `lat`, `lon`) VALUES (:id,:name, :description, :price, :url, :lat, :lon)",{
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            url: this.url,
            lat: this.lat,
            lon: this.lon
        });
        return this.id;
    }


}
