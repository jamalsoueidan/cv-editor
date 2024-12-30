import { ActionIcon, Container, Flex, Text, Title } from "@mantine/core";

import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

export default function PrivacyPolicy() {
  return (
    <Container size="md" my="xl">
      <Flex align="center" justify="center" mb="md" gap="md">
        <ActionIcon component={Link} to="/">
          <FaArrowLeft />
        </ActionIcon>
        <Title order={2} ta="center">
          Privacy Policy
        </Title>
      </Flex>
      <Text size="sm">
        <strong>Effective Date:</strong> 10/10/2024
      </Text>
      <Text size="md" mb="md">
        At gratiscvonline.dk, your privacy is important to us. This Privacy
        Policy explains how we handle your information when you use our CV maker
        service.
      </Text>
      <Title order={3} mt="lg" mb="sm">
        1. Information We Collect
      </Title>
      <Text size="md" mb="md">
        When you use our service, you may enter personal information such as:
        <ul>
          <li>Name</li>
          <li>Contact details</li>
          <li>Work experience</li>
          <li>Educational background</li>
          <li>Other details you include in your CV</li>
        </ul>
      </Text>
      <Title order={3} mt="lg" mb="sm">
        2. How We Use Your Information
      </Title>
      <Text size="md" mb="md">
        The information you provide is used solely for creating your CV. It is
        never shared with any third parties or used for any other purpose.
      </Text>
      <Title order={3} mt="lg" mb="sm">
        3. Data Storage and Deletion
      </Title>
      <Text size="md" mb="md">
        - Your data is temporarily saved on our system to enable you to download
        your CV. <br />
        - You can delete your CV at any time through the app. Once deleted, your
        data is permanently removed and cannot be recovered. <br />- If you stop
        using the app, no data will be kept on our system.
      </Text>
      <Title order={3} mt="lg" mb="sm">
        4. Data Sharing
      </Title>
      <Text size="md" mb="md">
        We <strong>do not share</strong> your data with any third-party
        companies, advertisers, or external organizations.
      </Text>
      <Title order={3} mt="lg" mb="sm">
        5. Your Rights
      </Title>
      <Text size="md" mb="md">
        - You have full control over your data. <br />- You can delete your CVs
        at any time directly within the app.
      </Text>
      <Title order={3} mt="lg" mb="sm">
        6. Security Measures
      </Title>
      <Text size="md" mb="md">
        We take reasonable measures to protect your data while it is stored on
        our system. However, we recommend not sharing sensitive or confidential
        information in your CV if privacy is a concern.
      </Text>
      <Title order={3} mt="lg" mb="sm">
        7. Contact Us
      </Title>
      <Text size="md" mb="md">
        If you have questions about this Privacy Policy or how your data is
        handled, you can contact us at:
        <br />
        <strong>Email:</strong> jamal[]soueidan.com <br />
      </Text>
      <Text size="md" mt="lg">
        This Privacy Policy ensures that your data stays private and secure
        while using gratiscvonline.dk. By using our app, you agree to this
        policy.
      </Text>
    </Container>
  );
}
