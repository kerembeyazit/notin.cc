import { useLocalStorage } from './useLocalStorage';
import { textSizes, fontFamilies } from '@/components/EditorToolbar';

export function useEditorSettings() {
  const [textSize, setTextSize] = useLocalStorage<string>('textSize', 'base');
  const [fontFamily, setFontFamily] = useLocalStorage<string>('fontFamily', 'sans');

  const textSizeValue = textSize || 'base';
  const fontFamilyValue = fontFamily || 'sans';

  const currentTextSize = textSizes.find(size => size.value === textSizeValue) || textSizes[1];
  const currentFontFamily = fontFamilies.find(font => font.value === fontFamilyValue) || fontFamilies[0];

  return {
    textSize: textSizeValue,
    fontFamily: fontFamilyValue,
    setTextSize,
    setFontFamily,
    currentTextSize,
    currentFontFamily,
  };
}

