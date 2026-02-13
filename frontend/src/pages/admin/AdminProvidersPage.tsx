import { useState } from "react"
import { toast } from "sonner"
import { Plus, Edit, Trash2, Eye, EyeOff, RotateCcw, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { EmptyState } from "@/components/ui/empty-state"

import {
  useProviders,
  useProviderAnalytics,
  useCreateProvider,
  useUpdateProvider,
  useDeleteProvider,
  useRestoreProvider,
} from "@/hooks/use-providers"
import type { Provider, CreateProviderPayload, ProviderCode } from "@/types"

const PROVIDER_CODES: { value: ProviderCode; label: string }[] = [
  { value: "MTN", label: "MTN" },
  { value: "TELECEL", label: "Telecel" },
  { value: "AT", label: "AirtelTigo" },
  { value: "AFA", label: "AFA" },
]

export default function AdminProvidersPage() {
  // ── State ─────────────────────────────────
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)

  // ── Form state ────────────────────────────
  const [createForm, setCreateForm] = useState<Partial<CreateProviderPayload>>({})
  const [editForm, setEditForm] = useState<Partial<CreateProviderPayload>>({})

  // ── Queries ──────────────────────────────
  const { data: providersData } = useProviders()
  const { data: analyticsData } = useProviderAnalytics()

  // ── Mutations ────────────────────────────
  const createProvider = useCreateProvider()
  const updateProvider = useUpdateProvider()
  const deleteProvider = useDeleteProvider()
  const restoreProvider = useRestoreProvider()

  // ── Computed ─────────────────────────────
  const providers = providersData?.data || []
  const analytics = analyticsData?.data || {}
  const activeProviders = providers.filter(p => p.isActive && !p.isDeleted)
  const inactiveProviders = providers.filter(p => !p.isActive && !p.isDeleted)

  // ── Handlers ─────────────────────────────
  const handleCreateProvider = async () => {
    try {
      await createProvider.mutateAsync(createForm as CreateProviderPayload)
      toast.success("Provider created successfully")
      setCreateDialogOpen(false)
      setCreateForm({})
    } catch (error) {
      toast.error("Failed to create provider")
    }
  }

  const handleEditProvider = async () => {
    if (!selectedProvider) return

    try {
      await updateProvider.mutateAsync({
        id: selectedProvider._id,
        data: editForm,
      })
      toast.success("Provider updated successfully")
      setEditDialogOpen(false)
      setSelectedProvider(null)
      setEditForm({})
    } catch (error) {
      toast.error("Failed to update provider")
    }
  }

  const handleToggleStatus = async (provider: Provider) => {
    try {
      await updateProvider.mutateAsync({
        id: provider._id,
        data: { isActive: !provider.isActive },
      })
      toast.success(`Provider ${provider.isActive ? "deactivated" : "activated"} successfully`)
    } catch (error) {
      toast.error("Failed to update provider status")
    }
  }

  const handleDeleteProvider = async (providerId: string) => {
    try {
      await deleteProvider.mutateAsync(providerId)
      toast.success("Provider deleted successfully")
    } catch (error) {
      toast.error("Failed to delete provider")
    }
  }

  const handleRestoreProvider = async (providerId: string) => {
    try {
      await restoreProvider.mutateAsync(providerId)
      toast.success("Provider restored successfully")
    } catch (error) {
      toast.error("Failed to restore provider")
    }
  }

  const openEditDialog = (provider: Provider) => {
    setSelectedProvider(provider)
    setEditForm({
      name: provider.name,
      code: provider.code,
      description: provider.description,
      logo: provider.logo,
    })
    setEditDialogOpen(true)
  }

  // ── Loading state ────────────────────────
  if (providers.length === 0 && !providersData) {
    return (
      <div className="space-y-6">
        <PageHeader title="Providers" />
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Providers"
        description="Manage telecom providers and their configurations"
        actions={
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Provider
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Provider</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="create-name">Name</Label>
                  <Input
                    id="create-name"
                    value={createForm.name || ""}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter provider name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="create-code">Code</Label>
                  <Select
                    value={createForm.code || ""}
                    onValueChange={(value: ProviderCode) => setCreateForm(prev => ({ ...prev, code: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider code" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROVIDER_CODES.map((code) => (
                        <SelectItem key={code.value} value={code.value}>
                          {code.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="create-description">Description</Label>
                  <Textarea
                    id="create-description"
                    value={createForm.description || ""}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter provider description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="create-logo-url">Logo URL</Label>
                  <Input
                    id="create-logo-url"
                    value={createForm.logo?.url || ""}
                    onChange={(e) => setCreateForm(prev => ({
                      ...prev,
                      logo: { url: e.target.value, alt: prev.logo?.alt || "" }
                    }))}
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateProvider}
                    disabled={createProvider.isPending || !createForm.name || !createForm.code}
                  >
                    {createProvider.isPending ? "Creating..." : "Create Provider"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Analytics Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Providers"
          value={providers.length.toString()}
          icon={BarChart3}
        />
        <StatCard
          title="Active Providers"
          value={activeProviders.length.toString()}
          icon={Eye}
        />
        <StatCard
          title="Inactive Providers"
          value={inactiveProviders.length.toString()}
          icon={EyeOff}
        />
        <StatCard
          title="Total Sales"
          value={Array.isArray(analytics) ? analytics.reduce((sum, p) => sum + (p.sales || 0), 0).toString() : "0"}
          icon={BarChart3}
        />
      </div>

      {/* Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Providers</CardTitle>
        </CardHeader>
        <CardContent>
          {providers.length === 0 ? (
            <EmptyState
              title="No providers found"
              description="Get started by creating your first telecom provider."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales Count</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider._id}>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={provider.logo?.url} alt={provider.logo?.alt || provider.name} />
                        <AvatarFallback>{provider.code}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{provider.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{provider.code}</Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={provider.isDeleted ? "deleted" : provider.isActive ? "active" : "inactive"}

                      />
                    </TableCell>
                    <TableCell>{provider.salesCount || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {provider.isDeleted ? (
                          <ConfirmDialog
                            title="Restore Provider"
                            description={`Are you sure you want to restore "${provider.name}"?`}
                            confirmText="Restore Provider"
                            onConfirm={() => handleRestoreProvider(provider._id)}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </ConfirmDialog>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(provider)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(provider)}
                            >
                              {provider.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <ConfirmDialog
                              title="Delete Provider"
                              description={`Are you sure you want to delete "${provider.name}"? This action can be undone.`}
                              confirmText="Delete Provider"
                              onConfirm={() => handleDeleteProvider(provider._id)}
                              variant="destructive"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </ConfirmDialog>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Provider Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Provider</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name || ""}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter provider name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-code">Code</Label>
              <Select
                value={editForm.code || ""}
                onValueChange={(value: ProviderCode) => setEditForm(prev => ({ ...prev, code: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider code" />
                </SelectTrigger>
                <SelectContent>
                  {PROVIDER_CODES.map((code) => (
                    <SelectItem key={code.value} value={code.value}>
                      {code.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editForm.description || ""}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter provider description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-logo-url">Logo URL</Label>
              <Input
                id="edit-logo-url"
                value={editForm.logo?.url || ""}
                onChange={(e) => setEditForm(prev => ({
                  ...prev,
                  logo: { url: e.target.value, alt: prev.logo?.alt || "" }
                }))}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleEditProvider}
                disabled={updateProvider.isPending || !editForm.name || !editForm.code}
              >
                {updateProvider.isPending ? "Updating..." : "Update Provider"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {/* Restore Confirmation Dialog */}
    </div>
  )
}
