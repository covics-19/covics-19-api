"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseCountryPrediction(prediction) {
    const resources_prediction_3w = prediction.resources_capacity - (prediction.confirmed_prediction_3w - prediction.deaths_prediction_3w - prediction.recovered_prediction_3w) / 5;
    return Object.assign(Object.assign({}, prediction), { resources_prediction_3w });
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
