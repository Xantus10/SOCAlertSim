import { Button, Group, Menu, Paper, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <Paper bd="solid 1px white" w="100%" pl="30px">
      <Group justify='space-between'>
        <Title order={2}>SOC Alert Sim</Title>
        <Menu position='bottom-end'>
          <Menu.Target>
            <Button w="110px" h="40px">Menu</Button>
          </Menu.Target>
          <Menu.Item onClick={() => navigate('/create')}>
            <Button fullWidth>Create new</Button>
          </Menu.Item>
        </Menu>
      </Group>
    </Paper>
  );
}
