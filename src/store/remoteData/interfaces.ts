
export interface GenericState<SliceData, SliceError> {
    expecting: boolean;
    waiting: boolean;
    data: SliceData | null;
    error: SliceError | null
}