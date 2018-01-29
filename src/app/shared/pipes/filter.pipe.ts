import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        debugger;
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.networkId.indexOf(filter) !== -1);
    }
}


@Pipe({
    name: "filterForRates",
    pure: false
})
export class FilterPipe2 implements PipeTransform {
    transform(items: any[], filter: string): any {
        debugger;
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.network.indexOf(filter) !== -1);
    }
}