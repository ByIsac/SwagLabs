const reporter = require('multiple-cucumber-html-reporter');
const dataAtual = new Date();

const options = {
    jsonDir: 'cypress/report', // Diretório onde os arquivos JSON dos resultados do Cucumber estão armazenados
    reportPath: 'cypress/cucumber-report', // Diretório de saída para o relatório HTML
    pageTitle: 'E2E Web RIS',
    reportName: 'E2E Web RIS',
    displayDuration: true,
    // durationInMS: true,
    // openReportInBrowser: true,
    pageFooter: '<div style="display: flex; justify-content: center; align-items: center;"><img src="https://uploads-ssl.webflow.com/5ecc07d89c19641b98843ecf/62e0bc0588429a114d9f4d18_Logo_Rede%20Dor.png" style="width: 350px; height: 200px;"></div>',
    metadata: {
        browser: {
            name: 'Chrome',
            version: '113.0.5672.92'
        },
        device: 'Local test machine',
        platform: {
            name: 'osx',
            version: '11.7.6'
        }
    },
    customData: {
        title: 'Test Run Info',
        data: [
            { label: 'Project', value: 'E2E Web RIS' },
            { label: 'Release', value: '1.0.0' },
        ]
    }
};

reporter.generate(options);
