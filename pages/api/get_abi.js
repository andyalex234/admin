import path from 'path';
import { promises as fs } from 'fs';

/*an api that sends a abi json so that we can consume 
from the mobiel app */
export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'artifacts');
 //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/contracts/Refund_by_Location.sol/RefundByLocation.json', 'utf8');
  //Return the content of the data file in json format
  res.status(200).send(fileContents);
}
