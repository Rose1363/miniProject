before(function(){
    cy.fixture('example.json').as('test_data')
})
describe("Read & write file demo", ()=>{
    it('Read file using fixture', function(){
        cy.fixture('example.json').then((data)=>{
            cy.log(data.name)
            cy.log('data.name')
        })

       
       
        cy.log(this.test_data.name)
    })

    it('Read file using readFile()', ()=>{
        cy.readFile('cypress/fixtures/example.json').then((data)=>{
            cy.log(data.name)
        })
    })

    it('Write file demo', ()=>{
        cy.writeFile('sample.txt', 'Hellp, I am Tram Nguyen\n')

        cy.writeFile('sample.txt', 'I am learning Cypress', {flag: 'a+'})
    })
})