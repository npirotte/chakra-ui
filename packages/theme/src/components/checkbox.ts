import { mode, part } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

function baseStyleControl(props: ThemeComponentProps) {
  const { colorScheme: c } = props

  return {
    w: "100%",
    transition: "box-shadow 250ms",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",

    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode("white", "gray.900")(props),

      _hover: {
        bg: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: mode(`${c}.600`, `${c}.300`)(props),
      },

      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props),
      },
    },

    _indeterminate: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode("white", "gray.900")(props),
    },

    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props),
    },

    _focus: {
      boxShadow: "outline",
    },

    _invalid: {
      borderColor: mode("red.500", "red.300")(props),
    },
  }
}

const baseStyleLabel = {
  userSelect: "none",
  _disabled: { opacity: 0.4 },
}

const baseStyle = (props: ThemeComponentProps) => ({
  [part("Checkbox", "control").selector]: baseStyleControl(props),
  [part("Checkbox", "label").selector]: baseStyleLabel,
})

const size = {
  sm: {
    [part("Checkbox", "control").selector]: { h: 3, w: 3 },
    [part("Checkbox", "label").selector]: { fontSize: "sm" },
    [part("Checkbox", "icon").selector]: { fontSize: "0.45rem" },
  },
  md: {
    [part("Checkbox", "control").selector]: { w: 4, h: 4 },
    [part("Checkbox", "label").selector]: { fontSize: "md" },
    [part("Checkbox", "icon").selector]: { fontSize: "0.625rem" },
  },
  lg: {
    [part("Checkbox", "control").selector]: { w: 5, h: 5 },
    [part("Checkbox", "label").selector]: { fontSize: "lg" },
    [part("Checkbox", "icon").selector]: { fontSize: "0.625rem" },
  },
}

const defaultVariants = {
  size: "md",
  colorScheme: "blue",
}

export default {
  baseStyle,
  variants: { size },
  defaultVariants,
}
