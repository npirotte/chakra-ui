import {
  chakra,
  forwardRef,
  SystemStyleObject,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { part } from "@chakra-ui/theme-tools"

export interface InputElementProps extends HTMLChakraProps<"div"> {
  placement?: "left" | "right"
}

const StyledElement = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    zIndex: 2,
  },
})

const InputElement = forwardRef<InputElementProps, "div">((props, ref) => {
  const { placement = "left", ...rest } = props

  const attr = placement === "left" ? "insetStart" : "insetEnd"

  const elementStyles: SystemStyleObject = {
    [attr]: "0",
  }

  return (
    <StyledElement
      ref={ref}
      {...rest}
      __css={elementStyles}
      {...part("Input", "element").attributes}
    />
  )
})

// This is used in `input-group.tsx`
InputElement.id = "InputElement"

if (__DEV__) {
  InputElement.displayName = "InputElement"
}

export const InputLeftElement = forwardRef<InputElementProps, "div">(
  (props, ref) => {
    const { className, ...rest } = props
    const _className = cx("chakra-input__left-element", className)

    return (
      <InputElement
        ref={ref}
        placement="left"
        className={_className}
        {...rest}
      />
    )
  },
)

// This is used in `input-group.tsx`
InputLeftElement.id = "InputLeftElement"

if (__DEV__) {
  InputLeftElement.displayName = "InputLeftElement"
}

export const InputRightElement = forwardRef<InputElementProps, "div">(
  (props, ref) => {
    const { className, ...rest } = props
    const _className = cx("chakra-input__right-element", className)

    return (
      <InputElement
        ref={ref}
        placement="right"
        className={_className}
        {...rest}
      />
    )
  },
)

// This is used in `input-group.tsx`
InputRightElement.id = "InputRightElement"

if (__DEV__) {
  InputRightElement.displayName = "InputRightElement"
}
