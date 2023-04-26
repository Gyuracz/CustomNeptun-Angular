import { NgModule } from "@angular/core";
import { TableFilterPipe } from "./table-filter.pipe";
import { TablerOrderPipe } from "./tabler-order.pipe";

@NgModule({
    declarations: [
        TableFilterPipe,
        TablerOrderPipe
    ],
    imports: [],
    exports: [
        TableFilterPipe,
        TablerOrderPipe
    ]
})
export class SharedPipesModule { }