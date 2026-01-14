import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	settings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	settings,
	onApply,
	onReset,
}) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [localSettings, setLocalSettings] =
		useState<ArticleStateType>(settings);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleChange = (newIsOpen: boolean) => {
		setIsFormOpen(newIsOpen);
	};

	const toggleForm = () => {
		setIsFormOpen((prev) => !prev);
	};

	useOutsideClickClose({
		isOpen: isFormOpen,
		onChange: handleChange,
		rootRef: sidebarRef,
	});

	useEffect(() => {
		setLocalSettings(settings);
	}, [settings]);

	const handleSettingsChange =
		<K extends keyof ArticleStateType>(key: K) =>
		(option: OptionType) => {
			setLocalSettings((prev) => ({ ...prev, [key]: option }));
		};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(localSettings);
	};

	const handleReset = () => {
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h1' family='open-sans' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						placeholder=''
						options={fontFamilyOptions}
						selected={localSettings.fontFamilyOption}
						onChange={handleSettingsChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={localSettings.fontSizeOption}
						onChange={handleSettingsChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						placeholder=''
						options={fontColors}
						selected={localSettings.fontColor}
						onChange={handleSettingsChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						placeholder=''
						options={backgroundColors}
						selected={localSettings.backgroundColor}
						onChange={handleSettingsChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						placeholder=''
						options={contentWidthArr}
						selected={localSettings.contentWidth}
						onChange={handleSettingsChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
