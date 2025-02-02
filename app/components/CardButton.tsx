import { Flex, Overlay, Text, UnstyledButton } from "@mantine/core";
import { motion } from "framer-motion";
import classes from "./CardButton.module.css";

export function CardButton({
  title,
  text,
  onClick,
  icon,
  loading = false,
}: {
  title: string;
  text: string;
  onClick: () => void;
  icon: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }}>
        <UnstyledButton
          onClick={onClick}
          className={classes.button}
          miw="350px"
          disabled={loading}
        >
          <div>
            <Flex align="center" gap="xs" mb="xs">
              {icon}
              <Text fz="lg" fw={500}>
                {title}
              </Text>
            </Flex>
            <Text fz="sm" c="dimmed">
              {text}
            </Text>
          </div>
        </UnstyledButton>
      </motion.div>
      {loading ? <Overlay /> : null}
    </>
  );
}
