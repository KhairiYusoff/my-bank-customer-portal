import { render } from "@testing-library/react";
import FormField from "../FormField";
import { useForm, Control } from "react-hook-form";

const FormFieldTestWrapper = ({
  label,
  name,
}: {
  label: string;
  name: string;
}) => {
  const { control } = useForm();
  return (
    <FormField label={label} name={name} control={control as Control<any>} />
  );
};

describe("FormField", () => {
  it("renders label correctly", () => {
    const { getByText } = render(
      <FormFieldTestWrapper label="Username" name="username" />
    );
    expect(getByText("Username")).toBeTruthy();
  });
});
