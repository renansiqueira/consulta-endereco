const rewire = require("rewire")
const index = rewire("./index")
const Page = index.__get__("Page")
// @ponicode
describe("clear", () => {
    let inst

    beforeEach(() => {
        inst = new Page()
    })

    test("0", () => {
        let callFunction = () => {
            inst.clear()
        }
    
        expect(callFunction).not.toThrow()
    })
})
