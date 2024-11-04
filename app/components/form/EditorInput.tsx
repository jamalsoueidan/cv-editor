/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, rem, Text, TextInputProps } from "@mantine/core";
import { RichTextEditor, Link as RTELink } from "@mantine/tiptap";

import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import "./EditorInput.css";

interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

export const EditorInput = (
  props: CustomInputProps & Pick<TextInputProps, "description" | "label">
) => {
  const { value, defaultValue, onChange, onFocus, onBlur, error, ...rest } =
    props;

  const editor = useEditor({
    extensions: [StarterKit, RTELink],
    content: defaultValue,
    onUpdate({ editor }) {
      const content = editor.getHTML();
      onChange && onChange(content as never);
    },
  });

  return (
    <Input.Wrapper label={rest.label}>
      <RichTextEditor
        editor={editor}
        style={{ marginBottom: rem(8), marginTop: rem(2) }}
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      {rest.description ? (
        <Text size="sm" c="dimmed">
          {rest.description}
        </Text>
      ) : null}
    </Input.Wrapper>
  );
};
