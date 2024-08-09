import './index.css'
import React, { useImperativeHandle } from 'react'
import { useControllableValue } from 'ahooks'

interface CalendarProps {
	value?: Date
	defaultValue?: Date
	onChange?: (date: Date) => void
}

export interface CalendarRef {
	getDate: () => Date
	setDate: (date: Date) => void
}

const Calendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (
	props,
	ref
) => {
	const { value, defaultValue = new Date(), onChange } = props

	const [date, setDate] = useControllableValue(props, {
		// 当props.value、props.defaultValue都没传值时，才使用defaultValue作为默认值
		defaultValue: new Date(),
	})

	// 暴露一些组件的api
	useImperativeHandle(ref, () => {
		return {
			getDate() {
				return date
			},
			setDate(date: Date) {
				setDate(date)
			},
		}
	})

	const monthCnNames = [
		'一月',
		'二月',
		'三月',
		'四月',
		'五月',
		'六月',
		'七月',
		'八月',
		'九月',
		'十月',
		'十一月',
		'十二月',
	]

	const handlePrevMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
	}

	const handleNextMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
	}

	/**
	 * 计算一个月有多少天
	 * @param year
	 * @param month
	 */
	const daysOfMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate()
	}

	/**
	 * 获取一个月的第一天是星期几
	 * @param year
	 * @param month
	 */
	const firstDayOfMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 1).getDay()
	}

	/**
	 * 渲染日历中的日期，包括空白块
	 * @returns
	 */
	const renderDays = () => {
		const days = []

		const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
		const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())
		// console.log(firstDay);
		// console.log(new Date(date.getFullYear(), date.getMonth(), 0).getDate());

		// 在第一天前填充上个月的日期
		for (let i = firstDay; i > 0; i--) {
			days.push(
				<div key={`prev-${i}`} className="empty prev">
					{new Date(
						date.getFullYear(),
						date.getMonth(),
						-i + 1
					).getDate()}
				</div>
			)
		}

		// 得到每个月多少天后，进行渲染
		for (let i = 1; i <= daysCount; i++) {
			const clickHandler = () => {
				const currentDate = new Date(
					date.getFullYear(),
					date.getMonth(),
					i
				)
				setDate(currentDate)
				// onChange?.(currentDate)
			}

			if (i === date.getDate()) {
				days.push(
					<div
						key={i}
						className="day active"
						onClick={() => clickHandler()}
					>
						{i}
					</div>
				)
			} else {
				days.push(
					<div key={i} className="day" onClick={() => clickHandler()}>
						{i}
					</div>
				)
			}
		}

		// 填充下个月的日期
		for (let i = 1; days.length < 35; i++) {
			days.push(
				<div key={`next-${i}`} className="empty next">
					{i}
				</div>
			)
		}

		return days
	}

	return (
		<div className="calendar">
			<div className="header">
				<button onClick={handlePrevMonth}>&lt;</button>
				<div>
					{date.getFullYear()}年{monthCnNames[date.getMonth()]}
				</div>
				<button onClick={handleNextMonth}>&gt;</button>
			</div>
			<div className="days">
				<div className="day">日</div>
				<div className="day">一</div>
				<div className="day">二</div>
				<div className="day">三</div>
				<div className="day">四</div>
				<div className="day">五</div>
				<div className="day">六</div>
				{renderDays()}
			</div>
		</div>
	)
}

export default Calendar
