import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { MaybeRenderProp } from "@chakra-ui/react-utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import { cx, runIfFn, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { PopoverProvider, usePopoverContext } from "./popover-context"
import { PopoverTransition, PopoverTransitionProps } from "./popover-transition"
import { usePopover, UsePopoverProps } from "./use-popover"
import { part } from "@chakra-ui/theme-tools"

export { usePopoverContext }

export interface PopoverProps extends UsePopoverProps, ThemingProps<"Popover"> {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: MaybeRenderProp<{
    isOpen: boolean
    onClose: () => void
    forceUpdate: (() => void) | undefined
  }>
}

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
export const Popover: React.FC<PopoverProps> = (props) => {
  const styles = useStyleConfig("Popover", props)

  const { children, ...rest } = omitThemingProps(props)
  const context = usePopover(rest)

  return (
    <chakra.div __css={styles}>
      <PopoverProvider value={context}>
        {runIfFn(children, {
          isOpen: context.isOpen,
          onClose: context.onClose,
          forceUpdate: context.forceUpdate,
        })}
      </PopoverProvider>
    </chakra.div>
  )
}

if (__DEV__) {
  Popover.displayName = "Popover"
}

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
export const PopoverTrigger: React.FC = (props) => {
  // enforce a single child
  const child: any = React.Children.only(props.children)
  const { getTriggerProps } = usePopoverContext()
  return React.cloneElement(child, getTriggerProps(child.props, child.ref))
}

if (__DEV__) {
  PopoverTrigger.displayName = "PopoverTrigger"
}

export interface PopoverContentProps extends PopoverTransitionProps {
  rootProps?: HTMLChakraProps<"div">
}

export const PopoverContent = forwardRef<PopoverContentProps, "section">(
  (props, ref) => {
    const { rootProps, ...contentProps } = props

    const { getPopoverProps, getPopoverPositionerProps } = usePopoverContext()

    const contentStyles: SystemStyleObject = {
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }

    return (
      <chakra.div
        {...getPopoverPositionerProps(rootProps)}
        className="chakra-popover__popper"
        {...part("popover", "popper").attributes}
      >
        <PopoverTransition
          {...getPopoverProps(contentProps, ref)}
          className={cx("chakra-popover__content", props.className)}
          __css={contentStyles}
          {...part("popover", "content").attributes}
        />
      </chakra.div>
    )
  },
)

if (__DEV__) {
  PopoverContent.displayName = "PopoverContent"
}

export interface PopoverHeaderProps extends HTMLChakraProps<"header"> {}

/**
 * PopoverHeader is the accessible header or label
 * for the popover's content and it is first announced by screenreaders.
 */
export const PopoverHeader = forwardRef<PopoverHeaderProps, "header">(
  (props, ref) => {
    const { getHeaderProps } = usePopoverContext()

    return (
      <chakra.header
        {...getHeaderProps(props, ref)}
        className={cx("chakra-popover__header", props.className)}
        {...part("popover", "header").attributes}
      />
    )
  },
)

if (__DEV__) {
  PopoverHeader.displayName = "PopoverHeader"
}

export interface PopoverBodyProps extends HTMLChakraProps<"div"> {}

/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
export const PopoverBody = forwardRef<PopoverBodyProps, "div">((props, ref) => {
  const { getBodyProps } = usePopoverContext()

  return (
    <chakra.div
      {...getBodyProps(props, ref)}
      className={cx("chakra-popover__body", props.className)}
      {...part("popover", "body").attributes}
    />
  )
})

if (__DEV__) {
  PopoverBody.displayName = "PopoverBody"
}
export interface PopoverFooterProps extends HTMLChakraProps<"footer"> {}

export const PopoverFooter: React.FC<PopoverFooterProps> = (props) => {
  return (
    <chakra.footer
      {...props}
      className={cx("chakra-popover__footer", props.className)}
      {...part("popover", "footer").attributes}
    />
  )
}

if (__DEV__) {
  PopoverFooter.displayName = "PopoverFooter"
}

export type PopoverCloseButtonProps = CloseButtonProps

export const PopoverCloseButton: React.FC<CloseButtonProps> = (props) => {
  const { onClose } = usePopoverContext()
  return (
    <CloseButton
      size="sm"
      onClick={onClose}
      position="absolute"
      borderRadius="md"
      top="0.25rem"
      insetEnd="0.5rem"
      padding="0.5rem"
      {...props}
    />
  )
}

if (__DEV__) {
  PopoverCloseButton.displayName = "PopoverCloseButton"
}

export interface PopoverArrowProps extends HTMLChakraProps<"div"> {}

export const PopoverArrow: React.FC<PopoverArrowProps> = (props) => {
  const { bg, bgColor, backgroundColor } = props
  const { getArrowProps, getArrowInnerProps } = usePopoverContext()
  const arrowBg = bg ?? bgColor ?? backgroundColor
  return (
    <chakra.div
      {...getArrowProps()}
      className="chakra-popover__arrow-positioner"
    >
      <chakra.div
        className={cx("chakra-popover__arrow", props.className)}
        {...getArrowInnerProps(props)}
        {...part("popover", "arrow").attributes}
        __css={{
          "--popper-arrow-bg": arrowBg ? `colors.${arrowBg}, ${arrowBg}` : "",
        }}
      />
    </chakra.div>
  )
}

if (__DEV__) {
  PopoverArrow.displayName = "PopoverArrow"
}
