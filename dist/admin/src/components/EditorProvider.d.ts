import { default as React } from 'react';
import { InputProps } from '@strapi/strapi/admin';
import { Preset } from '../config';
type EditorProviderBaseProps = Pick<InputProps, 'name' | 'disabled' | 'placeholder' | 'hint' | 'label' | 'required'> & {
    labelAction?: React.ReactNode;
    presetName: string;
    wordsLimit?: number;
    charsLimit?: number;
    isFieldLocalized: boolean;
    error?: string;
};
type EditorContextValue = EditorProviderBaseProps & {
    preset: Preset | null;
};
type EditorProviderProps = EditorProviderBaseProps & {
    children: React.ReactElement;
};
export declare function useEditorContext(): EditorContextValue;
export declare function EditorProvider({ name, disabled, error, placeholder, hint, label, labelAction, required, presetName, wordsLimit, charsLimit, children, isFieldLocalized, }: EditorProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
