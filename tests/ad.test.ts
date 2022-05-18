import { AdRecord } from "../records/ad.record";
import {pool} from "../utils/db";

afterAll(async ()=>{
    await  pool.end();
})

const defaultObj = {
    name: "testName",
    description: "blah",
    url: "https://megak.pl",
    price: 0,
    lat: 9,
    lon: 9,
}

test('AdRecord returns data from datatbase for one entry', async()=>{

    const ad = await AdRecord.getOne('abc');

    console.log(ad)

    expect(ad).toBeDefined();
    // expect(ad.id).toBe('abc');
    // expect(ad.name).toBe('Testowa')
})


test("AdRecord return null  from  datatnbase for unexisting entry", async () =>{
        const ad = await AdRecord.getOne("---")

        expect(ad).toBeNull();
})

test("AdRecord.findAll returns array of found entries when search", async()=>{
    const ads = await AdRecord.findAll('a')

    expect(ads).toEqual([]);
    expect(ads[0].id).toBeDefined();

})

test("AdRecord.insert new data adn return UUID", async()=>{
    const ad = new AdRecord(defaultObj);

    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');

})

test("AdRecord.insert inserts data todatabase", async()=> {
    const ad = new AdRecord(defaultObj);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);

})




