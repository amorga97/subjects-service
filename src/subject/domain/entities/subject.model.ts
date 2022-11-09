import { Schema, Types } from 'mongoose';

export const subjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    required: false,
    minlength: 250,
    maxlength: 2000,
  },
  institution: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 100,
  },
  author: {
    type: String,
    required: true,
  },
  meta_data: {
    type: [[String, String]],
    required: false,
  },
}).set('toJSON', {
  transform: (_, returnedObj) => {
    delete returnedObj.__v;
    delete returnedObj.password;
  },
});

export interface iSubject {
  _id?: Types.ObjectId;
  title: string;
  author: string;
  description?: string;
  institution?: string;
  meta_data?: [string, string][];
}
