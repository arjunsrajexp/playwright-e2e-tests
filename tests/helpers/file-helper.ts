import fs from 'fs'
import path from 'path'
import {parse} from 'csv-parse/sync'
/**
 * 
 * @param filePath 
 * @returns 
 */
function readCSV(filePath:string): any []{
    //Read the CSV file
    const csvDataStr=fs.readFileSync(filePath,{encoding:"utf-8"})

    //Parse the CSV data
    const csvDatArr= parse (csvDataStr,{
        columns:true,
        skip_empty_lines:true,  
        trim:true   
});
    return csvDatArr;
}

export default {readCSV}