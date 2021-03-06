import {
  ElementType,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { AnyObjectSchema } from "yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../FormInput";
import { Button, Props as IButtonProps } from "../Button";

export function GridRow({ children }: { children: ReactNode }) {
  return <div style={{ gridColumn: "1 / -1" }}>{children}</div>;
}

export function GridColumn({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type FieldPropType = {
  type: string;
  label?: string;
  // defaults to FormInput
  component?: ElementType;
  // defaults to GridColumn
  composition?: typeof GridRow | typeof GridColumn;
  inputProps?: InputProps;
};

export interface SchemaType {
  // fields: Array<{
  //   ns: string;
  //   type: string;
  //   label?: string;
  //   // defaults to FormInput
  //   component?: ElementType;
  //   // defaults to GridColumn
  //   composition?: typeof GridRow | typeof GridColumn;
  //   inputProps?: InputProps;
  // }>;

  fields: { [field: string]: FieldPropType };
  validation: AnyObjectSchema;
}

export type FieldType = "text" | "number" | "date" | "email" | "password";

interface FormCompositionProps<T> {
  schema: SchemaType;
  submit: SubmitHandler<T>;
  title?: string | JSX.Element;
  button?: string | ReactElement<IButtonProps>;
}

export function FormComposition<T>({
  schema,
  submit,
  title: formTitle,
  button: formButton,
}: PropsWithChildren<FormCompositionProps<T>>) {
  const methods = useForm<T>({
    resolver: yupResolver(schema.validation),
  });

  const formErrors = methods.formState.errors;

  function FormFields() {
    return (
      <>
        {Object.entries(schema.fields).map((field) => {
          const [name, props] = field;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const error = formErrors[name];

          const { inputProps, ...rest } = props;

          const Component = props?.component ?? FormInput;
          const Composition = props?.composition ?? GridColumn;

          return (
            <Composition key={name}>
              <Component
                error={error?.message}
                name={name}
                {...inputProps}
                {...rest}
              />
            </Composition>
          );
        })}
      </>
    );
  }

  function SubmitButton() {
    const isLabel = typeof formButton === "string";

    if (formButton) {
      return isLabel ? (
        <Button type="submit">{formButton}</Button>
      ) : (
        <>{formButton}</>
      );
    } else {
      return <Button type="submit">Submit</Button>;
    }
  }

  function Title() {
    return formTitle ? (
      typeof formTitle === "string" ? (
        <h3>{formTitle}</h3>
      ) : (
        formTitle
      )
    ) : null;
  }

  return (
    <FormProvider {...methods}>
      {formTitle && <Title />}
      <form onSubmit={methods.handleSubmit(submit)}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            rowGap: "20px",
          }}
        >
          <FormFields />

          <GridRow>
            <SubmitButton />
          </GridRow>
        </div>
      </form>
    </FormProvider>
  );
}
