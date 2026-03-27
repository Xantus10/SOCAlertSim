import { Button, Group, Menu, Paper, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <Paper bd="solid 1px white" p="10px" m="1rem">
      <Group justify='space-between'>
        <Title order={2}>SOC Alert Sim</Title>
        <Menu position='bottom-end'>
          <Menu.Target>
            <Button w="110px" h="40px">Menu</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigate('/')}>
              <Button fullWidth>Alert simulation</Button>
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/create')}>
              <Button fullWidth>Creator</Button>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
}
