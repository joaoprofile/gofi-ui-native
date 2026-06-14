import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Plus, Search, Pencil, Trash2, Inbox } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Stack, Row, Divider } from 'gofi-ui-native';
import { Header } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { Avatar } from 'gofi-ui-native';
import { ListItem } from 'gofi-ui-native';
import { Field } from 'gofi-ui-native';
import { Input } from 'gofi-ui-native';
import { Button, IconButton } from 'gofi-ui-native';
import { Badge } from 'gofi-ui-native';
import { EmptyState } from 'gofi-ui-native';
import { BottomSheet } from 'gofi-ui-native';
import { useToast } from 'gofi-ui-native';

interface Contact { id: string; name: string; email: string; role: string; }

const SEED: Contact[] = [
  { id: '1', name: 'Anna Carter', email: 'anna@acme.co', role: 'Designer' },
  { id: '2', name: 'Bruno Silva', email: 'bruno@acme.co', role: 'Engineer' },
  { id: '3', name: 'Carla Reis', email: 'carla@acme.co', role: 'Product' },
  { id: '4', name: 'Diego Luz', email: 'diego@acme.co', role: 'Sales' },
];

let SEQ = 100;

export function CrudApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const toast = useToast();

  const [items, setItems] = useState<Contact[]>(SEED);
  const [query, setQuery] = useState('');
  const [sheet, setSheet] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [touched, setTouched] = useState(false);

  const filtered = items.filter((c) =>
    `${c.name} ${c.email} ${c.role}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const openCreate = () => {
    setEditing(null);
    setName(''); setEmail(''); setRole(''); setTouched(false);
    setSheet(true);
  };

  const openEdit = (c: Contact) => {
    setEditing(c);
    setName(c.name); setEmail(c.email); setRole(c.role); setTouched(false);
    setSheet(true);
  };

  const save = () => {
    setTouched(true);
    if (name.trim().length < 2 || !email.includes('@')) return;
    if (editing) {
      setItems((prev) => prev.map((c) => (c.id === editing.id ? { ...c, name: name.trim(), email: email.trim(), role: role.trim() || '—' } : c)));
      toast({ tone: 'success', message: 'Contact updated' });
    } else {
      SEQ += 1;
      setItems((prev) => [{ id: String(SEQ), name: name.trim(), email: email.trim(), role: role.trim() || '—' }, ...prev]);
      toast({ tone: 'success', message: 'Contact added' });
    }
    setSheet(false);
  };

  const remove = (c: Contact) => {
    setItems((prev) => prev.filter((x) => x.id !== c.id));
    setSheet(false);
    toast({ tone: 'danger', message: `${c.name} deleted`, action: { label: 'Undo', onPress: () => setItems((prev) => [c, ...prev]) } });
  };

  const nameErr = touched && name.trim().length < 2 ? 'Tell us a name' : undefined;
  const emailErr = touched && !email.includes('@') ? 'Invalid email' : undefined;

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <Header
        title="Contacts"
        variant="brand"
        actions={<IconButton accessibilityLabel="Add contact" onPress={openCreate}><Plus size={22} color={t.textOnBrand} /></IconButton>}
      />

      <ScrollView
        contentContainerStyle={{ padding: t.space[4], paddingBottom: insets.bottom + t.space[10], gap: t.space[3] }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Input placeholder="Search contacts…" value={query} onChangeText={setQuery} iconStart={<Search size={18} color={t.textSecondary} />} />

        <Row justify="space-between" align="center">
          <Text variant="bodySm" color="secondary">{filtered.length} {filtered.length === 1 ? 'contact' : 'contacts'}</Text>
          <Button size="sm" iconStart={<Plus size={16} color="#fff" />} onPress={openCreate}>New</Button>
        </Row>

        {filtered.length === 0 ? (
          <EmptyState
            variant={query ? 'no-results' : 'first-use'}
            icon={<Inbox size={28} color={t.textSecondary} />}
            title={query ? 'No matches' : 'No contacts yet'}
            description={query ? 'Try another search term.' : 'Add your first contact to get started.'}
            action={query ? <Button variant="secondary" onPress={() => setQuery('')}>Clear search</Button> : <Button onPress={openCreate}>Add contact</Button>}
          />
        ) : (
          <Card variant="elevated">
            <Stack gap={0}>
              {filtered.map((c, i) => (
                <View key={c.id}>
                  <ListItem
                    leading={<Avatar name={c.name} size="md" />}
                    title={c.name}
                    subtitle={`${c.role} · ${c.email}`}
                    trailing={
                      <Row gap={1}>
                        <IconButton accessibilityLabel={`Edit ${c.name}`} onPress={() => openEdit(c)}><Pencil size={18} color={t.textSecondary} /></IconButton>
                        <IconButton accessibilityLabel={`Delete ${c.name}`} onPress={() => remove(c)}><Trash2 size={18} color={t.danger} /></IconButton>
                      </Row>
                    }
                    onPress={() => openEdit(c)}
                  />
                  {i < filtered.length - 1 ? <Divider /> : null}
                </View>
              ))}
            </Stack>
          </Card>
        )}
      </ScrollView>

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title={editing ? 'Edit contact' : 'New contact'}>
        <Stack gap={4}>
          {editing ? (
            <Row gap={3} align="center">
              <Avatar name={name || editing.name} size="lg" />
              <Badge tone="info">Editing</Badge>
            </Row>
          ) : null}
          <Field label="Name" required error={nameErr}>
            <Input placeholder="Jane Doe" value={name} onChangeText={setName} />
          </Field>
          <Field label="Email" required error={emailErr}>
            <Input placeholder="jane@acme.co" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          </Field>
          <Field label="Role">
            <Input placeholder="e.g. Designer" value={role} onChangeText={setRole} />
          </Field>
          <Row gap={2} justify="flex-end" style={{ marginTop: t.space[1] }}>
            {editing ? <Button variant="danger" iconStart={<Trash2 size={16} color="#fff" />} onPress={() => remove(editing)}>Delete</Button> : null}
            <Button variant="ghost" onPress={() => setSheet(false)}>Cancel</Button>
            <Button variant="primary" onPress={save}>{editing ? 'Save' : 'Add'}</Button>
          </Row>
        </Stack>
      </BottomSheet>
    </View>
  );
}
