import React, {
  forwardRef,
  InputHTMLAttributes,
  memo,
  useState,
  useEffect,
} from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  useDebounce?: boolean;
  debounceDelay?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      disabled,
      className = "",
      useDebounce = false,
      debounceDelay = 300,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    useEffect(() => {
      if (!mounted) {
        setMounted(true);
        return;
      }

      if (!useDebounce) {
        onChange(internalValue);
        return;
      }

      const handler = setTimeout(() => {
        onChange(internalValue);
      }, debounceDelay);

      return () => clearTimeout(handler);
    }, [internalValue]); // eslint-disable-line

    return (
      <input
        ref={ref}
        value={internalValue}
        onChange={(e) => {
          if (props.max && +e.target.value > +props.max) return;
          if (props.min && +e.target.value < +props.min) return;

          setInternalValue(e.target.value);
          if (!useDebounce) {
            onChange(e.target.value);
          }
        }}
        disabled={disabled}
        className={`border px-4 py-3 outline-none disabled:opacity-50 rounded-4xl text-text-input border-border-primary text-base ${className}`}
        {...props}
      />
    );
  }
);

export default memo(Input);
