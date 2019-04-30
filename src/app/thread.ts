
import { firestore} from 'firebase/app';
import {Timestamp} from '@firebase/firestore-types'

 export interface Thread{
Category?: string;
Content?: string;
DateTime?: Timestamp;
Title?: string;
id?: string;
}