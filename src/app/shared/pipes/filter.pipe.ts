import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filter",
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => {
            if (item.networkId) {
                return item.networkId.indexOf(filter) !== -1;
            } else {
                return false;
            }
        });
    }
}

@Pipe({
    name: "filterForRates",
    pure: false
})
export class FilterPipe2 implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => {
            if (item.network) {
                item.network.indexOf(filter) !== -1;
            } else {
                return false;
            }
        });
    }
}
