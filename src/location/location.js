import turfDistance from '@turf/distance';
import { point as turfPoint } from '@turf/helpers';

const options = { units: 'miles' };

// parameters should be [lat, long]
export const distance = (p1, p2) => turfDistance(point(p1), point(p2), options);

export const point = location => location.point;