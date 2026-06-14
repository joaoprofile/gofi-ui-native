import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { House, Users, Calendar, Settings, Plus, Search, Trash2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row, Stack, Divider } from 'gofi-ui-native';
import { Header } from 'gofi-ui-native';
import { TabBar } from 'gofi-ui-native';
import { SegmentedControl } from 'gofi-ui-native';
import { Input } from 'gofi-ui-native';
import { Field } from 'gofi-ui-native';
import { Avatar } from 'gofi-ui-native';
import { Badge } from 'gofi-ui-native';
import { ListItem } from 'gofi-ui-native';
import { Button, IconButton } from 'gofi-ui-native';
import { BottomSheet } from 'gofi-ui-native';
import { ConfirmDialog } from 'gofi-ui-native';
import { EmptyState } from 'gofi-ui-native';
import { useToast } from 'gofi-ui-native';

interface Contact { id: string; name: string; company: string; status: 'active' | 'lead'; }
const SEED: Contact[] = [
  { id: '1', name: 'Anna Carter', company: 'Acme Inc', status: 'active' },
  { id: '2', name: 'Bruno Silva', company: 'Globex', status: 'lead' },
  { id: '3', name: 'Carla Reis', company: 'Initech', status: 'active' },
  { id: '4', name: 'Diego Luz', company: 'Umbrella', status: 'lead' },
];

export function CrmApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [tab, setTab] = useState('contacts');
  const [contacts, setContacts] = useState(SEED);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active'>('all');
  const [editing, setEditing] = useState<Contact | null>(null);
  const [sheet, setSheet] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [toDelete, setToDelete] = useState<Contact | null>(null);

  const list = contacts.filter((c) =>
    (filter === 'all' || c.status === 'active') &&
    (c.name.toLowerCase().includes(query.toLowerCase()) || c.company.toLowerCase().includes(query.toLowerCase())),
  );

  const openNew = () => { setEditing(null); setName(''); setCompany(''); setSheet(true); };
  const openEdit = (c: Contact) => { setEditing(c); setName(c.name); setCompany(c.company); setSheet(true); };
  const save = () => {
    if (!name.trim()) return;
    if (editing) setContacts((cs) => cs.map((c) => (c.id === editing.id ? { ...c, name, company } : c)));
    else setContacts((cs) => [{ id: String(Date.now()), name, company, status: 'lead' }, ...cs]);
    setSheet(false);
    toast({ tone: 'success', message: editing ? 'Contact updated' : 'Contact added' });
  };
  const confirmDelete = () => {
    if (!toDelete) return;
    const removed = toDelete;
    setContacts((cs) => cs.filter((c) => c.id !== removed.id));
    toast({ tone: 'success', message: `${removed.name} deleted`, action: { label: 'Undo', onPress: () => setContacts((cs) => [removed, ...cs]) } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <Header title="Contacts" safeTop actions={<IconButton accessibilityLabel="Add contact" variant="solid" onPress={openNew}><Plus size={20} color="#fff" /></IconButton>} />
      <View style={{ paddingHorizontal: t.space[4], paddingTop: t.space[3], gap: t.space[3] }}>
        <Input placeholder="Search contacts…" value={query} onChangeText={setQuery} iconStart={<Search size={18} color={t.textSecondary} />} />
        <SegmentedControl value={filter} onChange={setFilter} options={[{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }]} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: t.space[4], paddingTop: t.space[3], paddingBottom: insets.bottom + t.space[10] }} showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <EmptyState
            variant={query ? 'no-results' : 'first-use'}
            icon={<Users size={28} color={t.textSecondary} />}
            title={query ? `No results for “${query}”` : 'No contacts yet'}
            description={query ? 'Try another term.' : 'Add your first contact to get started.'}
            action={<Button variant="primary" onPress={openNew}>Add contact</Button>}
          />
        ) : (
          <Stack gap={0}>
            {list.map((c, i) => (
              <View key={c.id}>
                <ListItem
                  leading={<Avatar name={c.name} size="md" />}
                  title={c.name}
                  subtitle={c.company}
                  onPress={() => openEdit(c)}
                  trailing={
                    <Row gap={2}>
                      <Badge tone={c.status === 'active' ? 'success' : 'info'}>{c.status}</Badge>
                      <IconButton accessibilityLabel={`Delete ${c.name}`} onPress={() => setToDelete(c)}><Trash2 size={18} color={t.danger} /></IconButton>
                    </Row>
                  }
                />
                {i < list.length - 1 ? <Divider /> : null}
              </View>
            ))}
          </Stack>
        )}
      </ScrollView>

      <TabBar active={tab} onChange={setTab} items={[
        { key: 'home', label: 'Home', icon: House },
        { key: 'contacts', label: 'Contacts', icon: Users },
        { key: 'agenda', label: 'Agenda', icon: Calendar },
        { key: 'settings', label: 'Settings', icon: Settings },
      ]} />

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title={editing ? 'Edit contact' : 'New contact'}>
        <Field label="Name" required>
          <Input placeholder="Full name" value={name} onChangeText={setName} />
        </Field>
        <Field label="Company">
          <Input placeholder="Company" value={company} onChangeText={setCompany} />
        </Field>
        <Row gap={2} justify="flex-end" style={{ marginTop: t.space[2] }}>
          <Button variant="ghost" onPress={() => setSheet(false)}>Cancel</Button>
          <Button variant="primary" onPress={save}>Save</Button>
        </Row>
      </BottomSheet>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title={`Delete ${toDelete?.name ?? ''}?`}
        description="You can undo this right after."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
      />
    </View>
  );
}
