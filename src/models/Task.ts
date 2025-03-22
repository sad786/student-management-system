import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  studentId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'overdue' | 'completed';
}

const taskSchema = new Schema<ITask>({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'overdue', 'completed'], default: 'pending' },
});

export default mongoose.model<ITask>('Task', taskSchema);