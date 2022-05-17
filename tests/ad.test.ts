import { AdRecord } from "../records/ad.record";


test('AdRecord returns data from datatbase for one entry', async()=>{

    const ad = await AdRecord.getOne('abc');

    console.log(ad)

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Testowa')
})


test("AdRecord return null  from  datatnbase for unexisting entry", async () =>{
        const ad = await AdRecord.getOne("---")

        expect(ad).toBeNull();
})