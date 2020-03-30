"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BIAS = 20;
function parseCountryPrediction(prediction) {
    const resources_requirements = (prediction.confirmed - prediction.deaths - prediction.recovered) / BIAS;
    const resources_requirements_prediction_3w = (prediction.confirmed_prediction_3w - prediction.deaths_prediction_3w - prediction.recovered_prediction_3w) / BIAS;
    const available_resources = prediction.resources_capacity - (prediction.confirmed - prediction.deaths - prediction.recovered) / BIAS;
    const available_resources_prediction_3w = prediction.resources_capacity - (prediction.confirmed_prediction_3w - prediction.deaths_prediction_3w - prediction.recovered_prediction_3w) / BIAS;
    return Object.assign(Object.assign({}, prediction), { resources_requirements,
        resources_requirements_prediction_3w,
        available_resources,
        available_resources_prediction_3w });
}
exports.parseCountryPrediction = parseCountryPrediction;
function parsePredictions(predictons) {
    return {
        results: predictons
            .results
            .map(prediction => parseCountryPrediction(prediction)),
        timestamp: predictons.timestap
    };
}
exports.parsePredictions = parsePredictions;
