'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tracker = $('#step-tracker');
const template = $('#step-template');

const qp = new URLSearchParams(location.search);
const steps = parseInt((qp.get('steps') || '3'), 10);

let step = 0;
while(step < steps) {
    let title = `Step ${step}`;
    let mashup = template.innerHTML.replace('{{ title }}', title);
    mashup = mashup.replace('{{ step }}', step);
    tracker.innerHTML += mashup;
    mashup = '';
    step++;
}

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
//
//  window.addEventListener('load',  updateStepConnectors);
// window.addEventListener('resize',  updateStepConnectors);