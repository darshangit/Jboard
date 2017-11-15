import { JarLocationModel } from './jar-location.model';

export interface JarWrapperModel {
    systemDate: string;
    locationDetailsResponseList: JarLocationModel[];
}
