'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const extraClass = (step, activeStep) => {
    let classList = [];
    if (step === activeStep) classList.push('active');
    if (step < activeStep) classList.push('complete');
    return ' ' + classList.join(' ');
};

/**
 * renderStepsFromQueryParameter - renders the number of steps based on query parameters
 */
const renderStepsFromQueryParameter = () => {
    const tracker = $('#step-tracker');
    const template = $('#step-template');

    const qp = new URLSearchParams(location.search);
    const steps = parseInt((qp.get('steps') || '3'), 10);
    const activeStep = parseInt((qp.get('active') || '1'), 10)
    let step = 1;
    while(step <= steps) {
        let title = `Step ${step}`;
        let mashup = template.innerHTML.replace('{{ title }}', title);
        mashup = mashup.replace('{{ step }}', step);
        mashup = mashup.replace('{{ extra_class }}', extraClass(step, activeStep));
        tracker.innerHTML += mashup;
        mashup = '';
        step++;
    }

    updateStepConnectors();
};

/**
 * updateStepConnectors - html class management for displaying step connectors
 */
const updateStepConnectors = () => {
    const topStepRowOffset = $('.step-tracker > .step').offsetTop || 0;
    const steps = $$('.step-tracker > .step');
    let rows = 0;
    let lastOffset = 0;
    steps.forEach((step, sI) => {
        step.classList.remove('row-start', 'row-end');

        const offset = step.offsetTop;
        const prevStep = steps[sI - 1];
        const nextStep = steps[sI + 1];
        if (lastOffset < offset) {
            lastOffset = offset;
            step.classList.add('row-start');
            if (prevStep) {
                prevStep.classList.add('row-end');
            }
        }
        
        if (!nextStep) {
            step.classList.add('row-end');
        }
    });
};

window.addEventListener('load',  renderStepsFromQueryParameter);
window.addEventListener('resize',  updateStepConnectors);