import {ValidationType} from "@/types/validation/ValidationType";
import {InputConstrainsInterface} from "@/types/input/InputConstrainsInterface";
import {FilterStrategyInterface} from "@/types/filter/FilterStrategyInterface";

export interface FilterColumnInterface {
    validation?: ValidationType,
    constrains: InputConstrainsInterface,
    strategy: FilterStrategyInterface
}
