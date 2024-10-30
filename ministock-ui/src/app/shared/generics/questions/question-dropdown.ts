import { QuestionBase } from "./question-base.generic";

export class DropdownQuestion extends QuestionBase<string> {
  override controlType = 'dropdown';
}
