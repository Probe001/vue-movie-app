describe('첫 테스트', ()=> {
  it('프로젝트 페이지 이동', () => {
    cy.visit('/')
    cy.get('.logo')
  }) 
})