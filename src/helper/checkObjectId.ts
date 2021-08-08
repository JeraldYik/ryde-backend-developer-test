import { ObjectId } from 'bson'

export default function checkObjectId(str: string): boolean {
  return ObjectId.isValid(str)
}
