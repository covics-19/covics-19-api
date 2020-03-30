import { 
    CountryPrediction, 
    ParsedCountryPrediction, 
    ParsedPredictions, 
    Predictions
} from '../types/prediction';

const BIAS = 0.15;
 
export function parseCountryPrediction(prediction: CountryPrediction): ParsedCountryPrediction {
    const resources_requirements = 
        (prediction.confirmed - prediction.deaths - prediction.recovered) * BIAS;
    const resources_requirements_prediction_3w = 
        (prediction.confirmed_prediction_3w - prediction.deaths_prediction_3w - prediction.recovered_prediction_3w) * BIAS;
    const available_resources = 
        prediction.resources_capacity - resources_requirements;
    const available_resources_prediction_3w = 
        prediction.resources_capacity - resources_requirements_prediction_3w;
    
    return {
        ...prediction,
        resources_requirements,
        resources_requirements_prediction_3w,
        available_resources,
        available_resources_prediction_3w
    };
}

export function parsePredictions(predictons: Predictions): ParsedPredictions {
    return {
        results: predictons
            .results
            .map(prediction => parseCountryPrediction(prediction)),
        timestamp: predictons.timestap
    };
}