const Book = require("./Book")
// @ponicode
describe("startLoading", () => {
    let inst

    beforeEach(() => {
        inst = new Book.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.startLoading()
        }
    
        expect(callFunction).not.toThrow()
    })
})
