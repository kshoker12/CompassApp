import React from 'react'
import { Svg, TSpan, Text } from 'react-native-svg';
import { dollarFormatter, dollarFormatterNoCents } from '../../../Helpers/HelperFunctions';
import { splitTextByWidth } from '../../../Helpers/financesHelper';

/**
 * @description Chart Label for networth pie chart
 * @param {number} x -> X position of the label
 * @param {number} y -> Y position of the label
 * @param {Object} datum -> Data for this label
 * @returns {JSX.Element}
 */
const NetworthChartLabel = ({x, y, datum}) => (
    <Text
        x={x}
        y={y}
        fill='white'
        textAnchor='middle'
        alignmentBaseline='middle'
        fontSize={10}
    >
        <TSpan fontWeight='bold'>{datum.label}</TSpan>
        <TSpan x = {x} dy = {16} fontSize={10}>{`${dollarFormatterNoCents.format(datum.y)}`}</TSpan>
    </Text>    
);

/**
 * @description Chart Label for Assets pie chart
 * @param {number} x -> X position of the label
 * @param {number} y -> Y position of the label
 * @param {Object} datum -> Data for this label
 * @returns {JSX.Element}
 */
const AssetChartLabel = ({x, y, datum}) => {
    /**
     * @description Obtain lines 
     */
    const lines = splitTextByWidth(datum.label, 18);

    return (
        <Text
            x={x}
            y={y}
            fill='black'
            textAnchor='middle'
            alignmentBaseline='middle'
            fontSize={10}
        >
            {lines.map((line, index)=>(
                <TSpan key={index} x = {x} dy = {index === 0 ? 0 : 10} fontSize={8}>
                    {line}
                </TSpan>
            ))}
            <TSpan fontWeight='bold' x = {x} dy = {14} fontSize={10}>{`${dollarFormatterNoCents.format(datum.y)}`}</TSpan>
        </Text>     
    );
};

/**
 * @description Chart Label for expense pie chart
 * @param {number} x -> X position of the label
 * @param {number} y -> Y position of the label
 * @param {Object} datum -> Data for this label
 * @returns {JSX.Element}
 */
const ExpenseChartLabel = ({x, y, datum}) => {
    /**
     * @description Obtain lines 
     */
    const lines = splitTextByWidth(datum.label, 18);

    return (
        <Text
            x={x}
            y={y}
            fill='black'
            textAnchor='middle'
            alignmentBaseline='middle'
            fontSize={10}
        >
            {lines.map((line, index)=>(
                <TSpan key={index} x = {x} dy = {index === 0 ? 0 : 10} fontSize={8} fill={'black'}>
                    {line}
                </TSpan>
            ))}
            <TSpan fontWeight='bold' x = {x} dy = {14} fontSize={10}>{`${dollarFormatterNoCents.format(datum.y)}`}</TSpan>
        </Text>     
    );
};

export { NetworthChartLabel, AssetChartLabel, ExpenseChartLabel};