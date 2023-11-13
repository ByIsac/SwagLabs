import faker from 'faker-br';
import 'cypress-real-events/support';
// import 'cypress-file-upload';
const senhaAleatoria = faker.internet.password()

export class usersPage {

    loginUser = 'autadm1'
    userAdm = 'autradadm1'
    gender = 'Masculino'
    profile = 'ADMINISTRADOR'


    administrativePanel() {
        cy.get(pageObjects.options).realHover()
        cy.get(pageObjects.administrativePanel).click()
    }

    checkUserInformation() {

        cy.get(pageObjects.fieldLogin).type(this.loginUser)
        cy.get(pageObjects.checkButton).click()
    }

    fieldsNameGenderAndProfileCompleted() {
        cy.get(pageObjects.fieldUserName).should('have.value', this.loginUser)
        cy.get(pageObjects.fieldGender).find('option:selected').should('contain', this.gender)
        cy.get(pageObjects.fieldProfile).find('option:selected').should('contain', this.profile)
    }

    unitSessionAllFieldsEmpty() {
        cy.get(pageObjects.fieldUnit).then(($campo) => {
            expect($campo.val()).to.be.null;
        })
        cy.get(pageObjects.fieldProfessionCode).should('have.value', '')
        cy.get(pageObjects.fieldCrm).should('have.value', '')
        cy.get(pageObjects.fieldRegistration).should('have.value', '')
    }

    clearOption() {
        cy.get(pageObjects.clearUserRecordButton).contains('Limpar').click()
    }

    optionAndButtonShouldDisappear() {
        cy.get(pageObjects.linkUnitField).should('not.exist')
        cy.contains('button', 'Desativar').should('not.exist')
    }

    clearAndCreationButton(buttonClear, buttonCreate) {
        cy.get(pageObjects.buttonClear).contains(buttonClear).should('be.disabled')
        cy.get(pageObjects.buttonCreate).contains(buttonCreate).should('be.disabled')
    }

    fillInUserInformation() {
        cy.get(pageObjects.fieldLogin).type(faker.internet.userName())
        cy.get(pageObjects.checkButton).click()
        cy.get(pageObjects.passwordField).type(faker.internet.password())
        cy.get(pageObjects.confirmPasswordField).type(faker.internet.password())
        cy.get(pageObjects.fieldUserName).type(faker.name.firstName())
        cy.get(pageObjects.fieldProfile).select('Administrador')
        cy.get(pageObjects.fieldGender).select('Masculino')
    }

    fieldsUserRegistrationOptionMustBeEmpty() {
        cy.get(pageObjects.fieldLogin).should('have.value', '')
        cy.get(pageObjects.passwordField).should('have.value', '')
        cy.get(pageObjects.confirmPasswordField).should('have.value', '')
        cy.get(pageObjects.fieldUserName).should('have.value', '')
        cy.get(pageObjects.fieldProfile).should('have.value', '')
        cy.get(pageObjects.fieldGender).then(($campo) => {
            expect($campo.val()).to.be.null;
        })
    }

    fillInformationLinkUnit() {
        cy.get(pageObjects.fieldUnit).select(1)
        cy.get(pageObjects.fieldProfessionCode).type(faker.random.number())
        cy.get(pageObjects.fieldCrm).type(faker.random.number())
        cy.get(pageObjects.fieldRegistration).type(faker.random.number())
    }

    clickClearLinkDriveInformation() {
        cy.get(pageObjects.cleanLinkDriveButton).click()
    }

    clickCreateButton(button) {
        cy.get(pageObjects.buttonCreate).contains(button).click()
    }

    passwordsDoNotMatch(message) {
        cy.get(pageObjects.returnMessage).invoke('text')
            .then((text) => {
                const mensagemSemQuebrasDeLinha = text.replace(/\n/g, '').trim()
                expect(mensagemSemQuebrasDeLinha).to.equal(message);
            })
    }

    userRegistrationScreen(screenTitle) {
        cy.get(pageObjects.usersTab).should('have.class', 'selected-tab')
        cy.get(pageObjects.userRegistrationScreen).should('be.visible')
        cy.get(pageObjects.userRegistrationScreenTitle).should('have.text', screenTitle)
    }

    fieldsMustBeEnable() {
        cy.get(pageObjects.fieldFetch).should('be.enabled')
        cy.get(pageObjects.fieldLogin).should('be.enabled')
        cy.get(pageObjects.fieldProfile).should('be.enabled')
        cy.get(pageObjects.passwordField).should('be.disabled')
        cy.get(pageObjects.confirmPasswordField).should('be.disabled')
        cy.get(pageObjects.fieldUserName).should('be.disabled')
        cy.get(pageObjects.cpfField).should('be.disabled')
    }

    loginNotRegistered() {
        cy.get(pageObjects.fieldLogin).type(faker.internet.userName())
        cy.get(pageObjects.checkButton).click()
    }

    allUserProfilesAvailable() {
        cy.get(pageObjects.fieldProfile).should(($select) => {
            const opcoes = $select.find('option');
            expect(opcoes).to.have.length(13)
        })
    }

    linkAndSaveInformation() {
        cy.get(pageObjects.linkUsersButton).click()
        cy.get(pageObjects.bindUserSaveButton).click()
    }

    popupIsDisplayed(message) {
        cy.get(pageObjects.returnMessage).invoke('text')
            .then((text) => {
                const mensagemSemQuebrasDeLinha = text.replace(/\n/g, '').trim()
                expect(mensagemSemQuebrasDeLinha).to.equal(message);
            })
    }

    profileIsNotDisplayed(profileOption) {
        cy.get(pageObjects.fieldProfile).should('not.contain', profileOption)
    }

    profileIsDisplayed(profileOption) {
        cy.get(pageObjects.fieldProfile).should('contain', profileOption)
    }

    listOfUserProfilesInAlphabeticalOrder() {
        cy.get(pageObjects.fieldProfile).should(($select) => {
            const options = Array.from($select[0].options)
                .map((option) => option.text)
                .filter((text) => text !== 'Selecione');

            const sortedOptions = [...options].sort();

            expect(options).to.deep.equal(sortedOptions);
        });
    }

    findName(name) {
        cy.get(pageObjects.fieldFetch).should('be.visible')
        cy.get(pageObjects.fieldFetch).type(name)
    }

    shouldDisplayResults() {
        cy.get(pageObjects.listNameResults)
            .find('li:not(:first-child)')
            .should('be.visible')
    }

    fetchInactiveUser(inactiveUser) {
        cy.get(pageObjects.fieldFetch).clear()
        cy.get(pageObjects.fieldFetch).type(inactiveUser)
    }

    shouldNotDisplayDisabledUserData() {
        const messageNoItemsFound = 'Nenhum item encontrado'

        cy.get(pageObjects.noItemsFound).should('have.text', messageNoItemsFound)
    }

    unitWithWhiteColor() {
        cy.get(pageObjects.fieldUnit).find('option')
            .filter((index, element) => {
                const color = Cypress.$(element).css('color')
                return color === 'rgb(255, 255, 255)' || color === '#fff' || color === 'white'
            })
            .last()
            .then(($option) => {
                cy.get(pageObjects.fieldUnit).select($option.val());
            })
    }

    unlinkButtonIsNotDisplayed() {
        cy.get(pageObjects.unlinkButton).should('not.exist')
    }

    unitWithTransparentColor() {
        cy.get(pageObjects.fieldUnit).find('option')
            .filter((index, element) => {
                const color = Cypress.$(element).css('color');
                return color === 'rgb(62, 123, 158)' || color === 'rgba(62, 123, 158, 1)' || color === '#3e7b9e';
            })
            .eq(2)
            .then(($option) => {
                cy.get(pageObjects.fieldUnit).select($option.val());
            })
    }

    unlinkButtonIsDisplayed() {
        cy.contains('button', 'Desvincular').should('be.visible')
    }

    admUser() {
        cy.get(pageObjects.fieldLogin).type(this.userAdm)
        cy.get(pageObjects.checkButton).click()
    }

    fieldsDisplayed(findName, login, name, cpf, password, confirmPassword, gender, profile, expert) {
        cy.contains('div', findName)
        cy.get(pageObjects.fieldFetch).should('be.visible')
        cy.contains('div', login)
        cy.get(pageObjects.fieldLogin).should('be.visible')
        cy.contains('div', name)
        cy.get(pageObjects.fieldUserName).should('be.visible')
        cy.contains('div', cpf)
        cy.get(pageObjects.cpfField).should('be.visible')
        cy.contains('div', password)
        cy.get(pageObjects.passwordField).should('be.visible')
        cy.contains('div', confirmPassword)
        cy.get(pageObjects.confirmPasswordField).should('be.visible')
        cy.contains('div', gender)
        cy.get(pageObjects.fieldGender).should('be.visible')
        cy.contains('div', profile)
        cy.get(pageObjects.checkButton).should('be.visible')
        cy.contains('div', expert)
        cy.get(pageObjects.fieldExpert).should('be.visible')
    }

    expertFieldNotDisplayed() {
        cy.get(pageObjects.fieldExpert).should('not.exist')
    }

    normalUser(user) {
        cy.get(pageObjects.fieldLogin).type(user)
        cy.get(pageObjects.checkButton).click()
    }

    changeTheNameAndGenderFields() {
        let nomeAnterior, sexoAnterior
        cy.get(pageObjects.fieldUserName).invoke('val').then((val) => {
            nomeAnterior = val
        })
        cy.get(pageObjects.fieldGender).invoke('val').then((val) => {
            sexoAnterior = val
        })
        cy.get(pageObjects.fieldUserName).clear().type('oper')
        cy.get(pageObjects.fieldGender).select('Feminino', { force: true })
        cy.contains('button', 'Salvar').click()
        cy.get(pageObjects.exitButton).click()
    }

    differentGenderAndName() {
        cy.get(pageObjects.fieldUserName).invoke('val').then((val) => {
            expect(val).to.not.equal('autope1')
        })
        cy.get(pageObjects.fieldGender).invoke('val').then((val) => {
            expect(val).to.not.equal('Masculuno')
        })
        cy.log('Testes realizado com sucesso! Retornando aos dados originais')
        cy.get(pageObjects.fieldUserName).clear().type('autope1')
        cy.get(pageObjects.fieldGender).select('Masculino')
        cy.contains('button', 'Salvar').click()
    }

    messageFillInAllFields(message) {
        cy.get(pageObjects.returnMessage).invoke('text')
            .then((text) => {
                const mensagemSemQuebrasDeLinha = text.replace(/\n/g, '').trim()
                expect(mensagemSemQuebrasDeLinha).to.equal(message);
            })
    }

    linkButton() {
        cy.get('div[class="form-group button-group"] button').last()
            .click()
    }

    unitLinkedSuccessfully(message) {
        cy.get(pageObjects.returnMessage).invoke('text')
            .then((text) => {
                const mensagemSemQuebrasDeLinha = text.replace(/\n/g, '').trim()
                expect(mensagemSemQuebrasDeLinha).to.equal(message);
            })
        cy.get(pageObjects.fieldUnit).find('option')
            .last()
            .should('have.css', 'color', 'rgb(62, 123, 158)')
    }

    unlinkUnit() {
        cy.get(pageObjects.fieldUnit).select('Vivalle')
        cy.contains('button', 'Desvincular').click()
    }

    selectUnit(unit) {
        cy.get(pageObjects.fieldUnit).select(unit)
    }

    deleteInformationsUnit() {
        cy.get(pageObjects.fieldCrm).clear()
        cy.get(pageObjects.fieldProfessionCode).clear()
        cy.get(pageObjects.fieldRegistration).clear()
    }

    saveInformationUnitButton() {
        cy.get('div[class="units-data-form"]').contains('button', 'Salvar').click()
    }

    changeUnitInformation() {
        cy.get(pageObjects.fieldProfessionCode).clear()
            .type(faker.random.number())
        cy.get(pageObjects.fieldCrm).clear()
            .type(faker.random.number())
        cy.get(pageObjects.fieldRegistration).clear()
            .type(faker.random.number())
    }

    clickUnlikButton() {
        cy.get('div[class="units-data-form"]').contains('button', 'Desvincular').click()
    }

    linkUnitAgain() {
        cy.get(pageObjects.fieldUnit).select('Cemed Bangu')
        cy.get(pageObjects.fieldProfessionCode).type(faker.random.number())
        cy.get('div[class="units-data-form"]').contains('button', 'Vincular').click()
    }

    changeUserName(userName) {
        cy.get(pageObjects.fieldUserName).clear().type(userName)
        cy.contains('button', 'Salvar').click()
        cy.get(pageObjects.exitButton).click()
    }

    validateNewUserName(newUserName) {
        cy.get(pageObjects.fieldHomeUserName).should('have.text', newUserName)
    }

    changingToOriginalName() {
        cy.get(pageObjects.fieldUserName).clear().type('autadm1')
        cy.contains('button', 'Salvar').click()
    }

    randomPassword() {
        cy.get(pageObjects.passwordField).type(faker.internet.password())
    }

    saveUserInformation() {
        cy.contains('button', 'Salvar').click()
    }

    randomConfirmPassword() {
        cy.get(pageObjects.passwordField).clear()
        cy.get(pageObjects.confirmPasswordField).type(faker.internet.password())
    }

    randomPasswordAndConfirmPassword() {
        cy.get(pageObjects.confirmPasswordField).clear()
        cy.get(pageObjects.passwordField).type(faker.internet.password())
        cy.get(pageObjects.confirmPasswordField).type(faker.internet.password())
    }

    changePassword() {
        cy.get(pageObjects.passwordField).clear().type('teste')
        cy.get(pageObjects.confirmPasswordField).clear().type('teste')
    }

    oldPassword() {
        cy.get(pageObjects.passwordField).clear().type('automationuser')
        cy.get(pageObjects.confirmPasswordField).clear().type('automationuser')
    }

    diferentPassword() {
        cy.get(pageObjects.passwordField).type('teçte')
        cy.get(pageObjects.confirmPasswordField).type('teçte')
    }

    selectProfile(typeProfile) {
        cy.get(pageObjects.fieldProfile).select(typeProfile)
    }

    clickLinkUsers() {
        cy.get(pageObjects.linkUsers).click()
    }

    bindingWindow(screenTitle) {
        cy.get(pageObjects.labelLinkUser).should('have.text', screenTitle)
    }

    optionsNameAndLogin(name, login) {
        cy.get(pageObjects.searchOption).contains(name)
        cy.get(pageObjects.searchOption).contains(login)
    }

    listSelectedUsers(list) {
        cy.get(pageObjects.selectedUsersTitle).contains(list)
    }

    saveSelectedUsers(button) {
        cy.get(pageObjects.saveSelectedUsersButton).contains(button).should('be.visible')
    }

    validateSymbol() {
        cy.get(pageObjects.xSymbol).should('be.visible')
    }

    signatureFile() {
        cy.get(pageObjects.signatureFile).selectFile('cypress/fixtures/assinatura.jpg', { force: true })
    }

    signatureImage() {
        cy.get(pageObjects.signatureImage).should('be.visible')
    }

    signatureOk() {
        cy.get(pageObjects.vSymbol).should('have.css', 'color')
            .and('eq', 'rgb(0, 128, 0)')
    }

    exportSignature() {
        cy.get(pageObjects.exportSignatureButton).click()
    }

    signatureImageIsDisplayed() {
        cy.get(pageObjects.signatureImageIsDisplayed).should('be.visible')
    }

    clickSignatureImage() {
        cy.get(pageObjects.signatureImageIsDisplayed).click()
    }

    downloadSignatureImage() {
        cy.readFile(`cypress/downloads/download.jpeg`).should('exist')
    }

    clickDeactivateButton() {
        cy.contains('button', 'Desativar').click()
    }

    reactivateButtonDisplayed() {
        cy.contains('button', 'Reativar').should('be.visible')
    }

    loginWithUser(user) {
        cy.get(pageObjects.exitButton).click()
        cy.get(pageObjects.logoutButton).click()
        cy.get(pageObjects.inputLogin).type(user)
        cy.get(pageObjects.inputPassword).type(user)
        cy.get(pageObjects.buttonSubmit).click()
    }

    loginMessage(message) {
        cy.get(pageObjects.loginErrorMessage).should('have.text', message)
    }

    reactivatingUserRestoringBulkData() {
        const testUser = 'disableuser'

        cy.log('Teste realizado com sucesso! Restaurando massa de dado utilizado no teste.')
        cy.get(pageObjects.inputLogin).clear().type(this.loginUser)
        cy.get(pageObjects.inputPassword).clear().type(this.loginUser)
        cy.get(pageObjects.buttonSubmit).click()
        cy.get(pageObjects.options).realHover()
        cy.get(pageObjects.administrativePanel).click()
        cy.get(pageObjects.fieldLogin).type(testUser)
        cy.get(pageObjects.checkButton).click()
        cy.contains('button', 'Reativar').click()
    }

    deactivateUserRestoringBulkData() {
        const testUser = 'activationuser'

        cy.log('Teste realizado com sucesso! Restaurando massa de dado utilizado no teste.')
        cy.get(pageObjects.options).realHover()
        cy.get(pageObjects.administrativePanel).click()
        cy.get(pageObjects.fieldLogin).type(testUser)
        cy.get(pageObjects.checkButton).click()
        cy.contains('button', 'Desativar').click()
    }

    reactivateButton() {
        cy.contains('button', 'Reativar').click()
    }

    disableButtonDisplayed() {
        cy.contains('button', 'Desativar').should('be.visible')
    }

    loginSuccessfully() {
        cy.get(pageObjects.headerWelcome).should('be.visible')
    }

    changingProfileType(changeTypeProfile) {
        cy.get(pageObjects.fieldProfile).select(changeTypeProfile)
    }

    profileViewed(newProfile) {
        cy.get('p[class="text-center"]').contains(newProfile)
    }

    restoringProfileType() {
        cy.log('Teste finalizado! Restaurando massa de dados')
        cy.get(pageObjects.logoutButton).click()
        cy.get(pageObjects.inputLogin).type(this.loginUser)
        cy.get(pageObjects.inputPassword).type(this.loginUser)
        cy.get(pageObjects.buttonSubmit).click()
        cy.get(pageObjects.options).realHover()
        cy.get(pageObjects.administrativePanel).click()
        cy.get(pageObjects.fieldLogin).type('browseruser')
        cy.get(pageObjects.checkButton).click()
        cy.get(pageObjects.fieldProfile).select('Administrador')
    }

    restoreProfile() {
        cy.log('Teste finalizado! Restaurando massa de dados')
        cy.get(pageObjects.inputLogin).clear().type(this.loginUser)
        cy.get(pageObjects.inputPassword).clear().type(this.loginUser)
        cy.get(pageObjects.buttonSubmit).click()
        cy.get(pageObjects.options).realHover()
        cy.get(pageObjects.administrativePanel).click()
        cy.get(pageObjects.fieldLogin).type('user.')
        cy.get(pageObjects.checkButton).click()
        cy.contains('button', 'Reativar').click()
    }

    fillNameCpfProfileAndGender() {
        cy.get(pageObjects.fieldUserName).type(faker.name.firstName())
        cy.get(pageObjects.fieldProfile).select('ADMINISTRADOR')
        cy.get(pageObjects.fieldGender).select('Masculino')
    }

    searchAndSelectUser(userName) {
        cy.get(pageObjects.searchFor).type(userName)
        cy.wait(500)
        cy.get(pageObjects.listUserOption).click()
    }

    saveLink() {
        cy.get(pageObjects.saveUserBinding).click()
    }

    confirmationWindow(text1, text2, text3) {
        cy.get(pageObjects.textConfirmationWindow).contains(text1)
        cy.get(pageObjects.textConfirmationWindow).contains(text2)
        cy.get(pageObjects.textConfirmationWindow).contains(text3)
    }

    buttonYesAndNoDisplayed(buttonYes, buttonNo) {
        cy.xpath(pageObjects.confirmBindingButtonYes).contains(buttonYes)
        cy.xpath(pageObjects.confirmBindingButtonNo).contains(buttonNo)
    }

    password() {
        cy.get(pageObjects.passwordField).type(senhaAleatoria)
        cy.get(pageObjects.confirmPasswordField).type(senhaAleatoria)
    }

    optionLinkUnitDisplayed() {
        cy.get(pageObjects.linkUnitField).should('be.visible')
    }

    register(profile) {
        cy.get(pageObjects.fieldLogin).type(faker.internet.userName())
        cy.get(pageObjects.checkButton).click()
        cy.get(pageObjects.passwordField).type(senhaAleatoria)
        cy.get(pageObjects.confirmPasswordField).type(senhaAleatoria)
        cy.get(pageObjects.fieldUserName).type(faker.name.firstName())
        cy.get(pageObjects.fieldProfile).select(profile)
        cy.get(pageObjects.fieldGender).select('Masculino')
        cy.get(pageObjects.buttonCreate).click()
    }

    viewProfileType(profile) {
        cy.get(pageObjects.fieldProfile).find('option:selected').should('contain', profile)

    }

    changePasswordUser(user) {
        cy.get(pageObjects.fieldLogin).type(user)
        cy.get(pageObjects.checkButton).click()
        cy.get(pageObjects.passwordField).type(user)
        cy.get(pageObjects.confirmPasswordField).type(user)
        cy.contains('button', 'Salvar').click()
    }

    validateTimeElement() {
        cy.get(pageObjects.fieldLogin, { timeout: 5000 }).should('be.visible');
    }
}


const pageObjects = {

    options: 'div[class="option-text"]',
    administrativePanel: 'a[href="/admin"]',
    fieldLogin: 'input[id="login"]',
    checkButton: 'div[class="form-group secondElement login"] button',
    fieldUserName: 'input[id="nome"]',
    fieldGender: 'select[id="sexo"]',
    fieldProfile: 'select[id="perfil"]',
    fieldUnit: 'select[id="idUnidade"]',
    fieldProfessionCode: 'input[id="codPro"]',
    fieldCrm: 'input[id="crm"]',
    fieldRegistration: 'input[id="matricula"]',
    clearUserRecordButton: 'button.btn-action',
    linkUnitField: 'form h3',
    buttonClear: '.botoes button:nth-child(1)',
    buttonCreate: '.botoes button:nth-child(2)',
    passwordField: 'input[id="senha"]',
    confirmPasswordField: 'input[id="repeticaoSenha"]',
    cleanLinkDriveButton: ':nth-child(3) > div > div.form-group.button-group :nth-child(1)',
    returnMessage: 'div[class="toast-message ng-star-inserted"]',
    usersTab: 'li[tabindex="0"]',
    userRegistrationScreen: 'div[class="content"]',
    userRegistrationScreenTitle: 'div h3',
    fieldFetch: 'input[placeholder="Buscar"]',
    cpfField: 'input[id="cpf"]',
    linkUsersButton: 'div[class="form-group perfil"] button',
    bindUserSaveButton: 'article button',
    listNameResults: 'app-autocomplete div ul',
    noItemsFound: 'i[class="text-sm text-dg"]',
    unlinkButton: '.ng-star-inserted.ng-touched.ng-dirty.ng-invalid div.form-group.button-group > button.btn.btn-md.btn-block.btn-action.btn-delete.ng-star-inserted',
    fieldExpert: 'div[class="especialista"]',
    exitButton: 'div[class="exit-button"]',
    fieldHomeUserName: 'span[class="username"]',
    linkUsers: 'div[class="form-group perfil"] button',
    labelLinkUser: 'div[class="header_vinc"] label',
    searchOption: 'div[class="radio-content"]',
    selectedUsersTitle: 'div[class="user-list"] label',
    saveSelectedUsersButton: 'div[class="body-content"] button',
    xSymbol: 'svg[data-icon="times"]',
    vSymbol: 'svg[data-icon="check"]',
    signatureFile: 'div[class="groupSignature"] input',
    signatureImage: '.signature-img',
    exportSignatureButton: 'div[class="groupSignature"] button',
    signatureImageIsDisplayed: 'a[class="signature-img"] img',
    logoutButton: 'li[class="menu-item button-exit"] a',
    inputLogin: 'input[id=login]',
    inputPassword: 'input[id=password]',
    buttonSubmit: 'button[data-cy=submit]',
    loginErrorMessage: '.message-card-component_theme-red_content > div',
    headerWelcome: 'div[class="template-header-info__data-welcome"]',
    searchFor: 'div[class="window-body"] input[type="text"]',
    listUserOption: 'div[class="window-body"] li[class="item ng-star-inserted"]',
    saveUserBinding: 'div[class="button-group"] button',
    textConfirmationWindow: 'div[class="app-modal-message__theme-dark-blue"] p',
    confirmBindingButtonYes: '(//button[@id="modalMessageButton"])[1]',
    confirmBindingButtonNo: '(//button[@id="modalMessageButton"])[2]'


}