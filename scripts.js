'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const extraClass = (step, activeStep) => {
    let classList = [];
    if (step === activeStep) classList.push('active');
    if (step < activeStep) classList.push('complete');
    return ' ' + classList.join(' ');
};

const qp = new URLSearchParams(location.search);
let steps = parseInt((qp.get('steps') || '3'), 10);
let activeStep = parseInt((qp.get('active') || '1'), 10)

let newUrl = location.href;

const renderStepsSelectBox = () => {
    let step = 3;
    while( step <= 15 ) {
        $('#step-changer').innerHTML += `
            <option value="${step}">${step}</option>
        `;
        step++;
    }
};

const renderActiveStepsSelectBox = () => {
    let step = 1;
    $('#active-step-changer').innerHTML = '';
    while( step <= steps ) {
        $('#active-step-changer').innerHTML += `
            <option value="${step}">${step}</option>
        `;
        step++;
    }
};

const demoBehaviors = () => {
    // Button listener
    $('#update-btn').addEventListener('click', evt => {
        steps = parseInt(($('#step-changer').value || 3), 10);
        activeStep = parseInt(($('#active-step-changer').value || 1), 10);
        renderSteps();
        renderActiveStepsSelectBox();
    });

};

const renderDemo = () => {
    renderStepsSelectBox();
    renderActiveStepsSelectBox();
    demoBehaviors();
    renderSteps();
};

/**
 * renderSteps - renders the number of steps
 */
const renderSteps = () => {
    const tracker = $('#step-tracker');
    const template = $('#step-template');

    tracker.innerHTML = '';

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

window.addEventListener('load',  renderDemo);
window.addEventListener('resize',  updateStepConnectors);