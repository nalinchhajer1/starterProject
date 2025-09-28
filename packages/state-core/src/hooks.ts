import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from './types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch();
