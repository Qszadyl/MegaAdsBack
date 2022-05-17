import { AdRecord } from "../records/ad.record"

const defaultObj = {
    id: "11",
    name: "testName",
    description: "blah",
    url: "https://megak.pl",
    price: 0,
    lat: 9,
    lon: 9,
}


test("Can build AdRecord", () =>{
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe("testName")
    expect(ad.description).toBe("blah")
});

test('Validates invalid price', ()=>{
    expect(()=> new AdRecord({
        ...defaultObj,
        price: 2

})).toThrow('Cena nie może być mniejsza niż zero  ani przekraczać 9999999')


})


//TODO 