import React, { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  useSiteSettings,
  useSignupApproval,
  useStorefrontAutoApprove,
  useSettingsCommission,
  useApiSettingsQuery,
  useUpdateSiteSettings,
  useUpdateSignupApproval,
  useUpdateStorefrontAutoApprove,
  useUpdateWalletSettings,
  useUpdateCommissionSettingsViaSettings,
  useUpdateApiSettings,
} from "@/hooks/use-settings"
import { useWalletSettings } from "@/hooks/use-wallet"
import type { SiteSettings, WalletSettings, CommissionSettings, ApiSettings } from "@/types"

export default function AdminSettingsPage() {
  // ── Queries ─────────────────────────────────
  const { data: siteData, isLoading: loadingSite } = useSiteSettings()
  const { data: signupData, isLoading: loadingSignup } = useSignupApproval()
  const { data: storefrontData, isLoading: loadingStorefront } = useStorefrontAutoApprove()
  const { data: walletData, isLoading: loadingWallet } = useWalletSettings()
  const { data: commissionData, isLoading: loadingCommission } = useSettingsCommission()
  const { data: apiData, isLoading: loadingApi } = useApiSettingsQuery()

  // ── Mutations ─────────────────────────────────
  const updateSiteSettings = useUpdateSiteSettings()
  const updateSignupApproval = useUpdateSignupApproval()
  const updateStorefrontAutoApprove = useUpdateStorefrontAutoApprove()
  const updateWalletSettings = useUpdateWalletSettings()
  const updateCommissionSettings = useUpdateCommissionSettingsViaSettings()
  const updateApiSettings = useUpdateApiSettings()

  // ── Local state for forms ────────────────────
  const [siteForm, setSiteForm] = useState<Partial<SiteSettings>>({})
  const [signupForm, setSignupForm] = useState({ requireApprovalForSignup: false })
  const [storefrontForm, setStorefrontForm] = useState({ autoApproveStorefronts: false })
  const [walletForm, setWalletForm] = useState<Partial<WalletSettings>>({})
  const [commissionForm, setCommissionForm] = useState<Partial<CommissionSettings>>({})
  const [apiForm, setApiForm] = useState<Partial<ApiSettings>>({})

  // ── Initialize forms when data loads ────────
  React.useEffect(() => {
    if (siteData?.data) setSiteForm(siteData.data)
  }, [siteData])

  React.useEffect(() => {
    if (signupData?.data) setSignupForm(signupData.data)
  }, [signupData])

  React.useEffect(() => {
    if (storefrontData?.data) setStorefrontForm(storefrontData.data)
  }, [storefrontData])

  React.useEffect(() => {
    if (walletData?.data) setWalletForm(walletData.data)
  }, [walletData])

  React.useEffect(() => {
    if (commissionData?.data) setCommissionForm(commissionData.data)
  }, [commissionData])

  React.useEffect(() => {
    if (apiData?.data) setApiForm(apiData.data)
  }, [apiData])

  // ── Handlers ─────────────────────────────────
  const handleSaveSiteSettings = async () => {
    try {
      await updateSiteSettings.mutateAsync(siteForm)
      toast.success("Site settings updated successfully")
    } catch (error) {
      toast.error("Failed to update site settings")
    }
  }

  const handleSaveSignupSettings = async () => {
    try {
      await updateSignupApproval.mutateAsync(signupForm.requireApprovalForSignup)
      toast.success("Signup settings updated successfully")
    } catch (error) {
      toast.error("Failed to update signup settings")
    }
  }

  const handleSaveStorefrontSettings = async () => {
    try {
      await updateStorefrontAutoApprove.mutateAsync(storefrontForm.autoApproveStorefronts)
      toast.success("Storefront settings updated successfully")
    } catch (error) {
      toast.error("Failed to update storefront settings")
    }
  }

  const handleSaveWalletSettings = async () => {
    try {
      await updateWalletSettings.mutateAsync(walletForm)
      toast.success("Wallet settings updated successfully")
    } catch (error) {
      toast.error("Failed to update wallet settings")
    }
  }

  const handleSaveCommissionSettings = async () => {
    try {
      await updateCommissionSettings.mutateAsync(commissionForm)
      toast.success("Commission settings updated successfully")
    } catch (error) {
      toast.error("Failed to update commission settings")
    }
  }

  const handleSaveApiSettings = async () => {
    try {
      await updateApiSettings.mutateAsync(apiForm)
      toast.success("API settings updated successfully")
    } catch (error) {
      toast.error("Failed to update API settings")
    }
  }

  const isLoading = loadingSite || loadingSignup || loadingStorefront || loadingWallet || loadingCommission || loadingApi

  if (isLoading) {
    return <div className="p-6">Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground">
          Configure site settings, user policies, wallet limits, commission rates, and API integrations.
        </p>
      </div>

      <Tabs defaultValue="site" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* Site Settings */}
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isSiteOpen"
                  checked={siteForm.isSiteOpen || false}
                  onCheckedChange={(checked) => setSiteForm(prev => ({ ...prev, isSiteOpen: checked }))}
                />
                <Label htmlFor="isSiteOpen">Site is open for business</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customMessage">Maintenance Message</Label>
                <Textarea
                  id="customMessage"
                  value={siteForm.customMessage || ""}
                  onChange={(e) => setSiteForm(prev => ({ ...prev, customMessage: e.target.value }))}
                  placeholder="Message shown when site is closed"
                  rows={3}
                />
              </div>

              <Separator />

              <Button
                onClick={handleSaveSiteSettings}
                disabled={updateSiteSettings.isPending}
                className="w-full sm:w-auto"
              >
                {updateSiteSettings.isPending ? "Saving..." : "Save Site Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Signup Settings */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="requireApproval"
                  checked={signupForm.requireApprovalForSignup || false}
                  onCheckedChange={(checked) => setSignupForm({ requireApprovalForSignup: checked })}
                />
                <Label htmlFor="requireApproval">Require admin approval for new user registrations</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoApproveStorefront"
                  checked={storefrontForm.autoApproveStorefronts || false}
                  onCheckedChange={(checked) => setStorefrontForm({ autoApproveStorefronts: checked })}
                />
                <Label htmlFor="autoApproveStorefront">Auto-approve storefront applications</Label>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button
                  onClick={handleSaveSignupSettings}
                  disabled={updateSignupApproval.isPending}
                  className="w-full sm:w-auto"
                >
                  {updateSignupApproval.isPending ? "Saving..." : "Save Signup Settings"}
                </Button>
                <Button
                  onClick={handleSaveStorefrontSettings}
                  disabled={updateStorefrontAutoApprove.isPending}
                  variant="outline"
                  className="w-full sm:w-auto ml-2"
                >
                  {updateStorefrontAutoApprove.isPending ? "Saving..." : "Save Storefront Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet Settings */}
        <TabsContent value="wallet">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Minimum Top-up Amounts by User Type (GHS)</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentMin">Agent</Label>
                    <Input
                      id="agentMin"
                      type="number"
                      min="0"
                      step="0.01"
                      value={walletForm.minimumTopUpAmounts?.agent || ""}
                      onChange={(e) => setWalletForm(prev => ({
                        minimumTopUpAmounts: {
                          agent: parseFloat(e.target.value) || 0,
                          super_agent: prev.minimumTopUpAmounts?.super_agent || 0,
                          dealer: prev.minimumTopUpAmounts?.dealer || 0,
                          super_dealer: prev.minimumTopUpAmounts?.super_dealer || 0,
                          default: prev.minimumTopUpAmounts?.default || 0,
                        }
                      }))}
                      placeholder="10.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="superAgentMin">Super Agent</Label>
                    <Input
                      id="superAgentMin"
                      type="number"
                      min="0"
                      step="0.01"
                      value={walletForm.minimumTopUpAmounts?.super_agent || ""}
                      onChange={(e) => setWalletForm(prev => ({
                        minimumTopUpAmounts: {
                          agent: prev.minimumTopUpAmounts?.agent || 0,
                          super_agent: parseFloat(e.target.value) || 0,
                          dealer: prev.minimumTopUpAmounts?.dealer || 0,
                          super_dealer: prev.minimumTopUpAmounts?.super_dealer || 0,
                          default: prev.minimumTopUpAmounts?.default || 0,
                        }
                      }))}
                      placeholder="50.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dealerMin">Dealer</Label>
                    <Input
                      id="dealerMin"
                      type="number"
                      min="0"
                      step="0.01"
                      value={walletForm.minimumTopUpAmounts?.dealer || ""}
                      onChange={(e) => setWalletForm(prev => ({
                        minimumTopUpAmounts: {
                          agent: prev.minimumTopUpAmounts?.agent || 0,
                          super_agent: prev.minimumTopUpAmounts?.super_agent || 0,
                          dealer: parseFloat(e.target.value) || 0,
                          super_dealer: prev.minimumTopUpAmounts?.super_dealer || 0,
                          default: prev.minimumTopUpAmounts?.default || 0,
                        }
                      }))}
                      placeholder="100.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="superDealerMin">Super Dealer</Label>
                    <Input
                      id="superDealerMin"
                      type="number"
                      min="0"
                      step="0.01"
                      value={walletForm.minimumTopUpAmounts?.super_dealer || ""}
                      onChange={(e) => setWalletForm(prev => ({
                        minimumTopUpAmounts: {
                          agent: prev.minimumTopUpAmounts?.agent || 0,
                          super_agent: prev.minimumTopUpAmounts?.super_agent || 0,
                          dealer: prev.minimumTopUpAmounts?.dealer || 0,
                          super_dealer: parseFloat(e.target.value) || 0,
                          default: prev.minimumTopUpAmounts?.default || 0,
                        }
                      }))}
                      placeholder="200.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultMin">Default</Label>
                  <Input
                    id="defaultMin"
                    type="number"
                    min="0"
                    step="0.01"
                    value={walletForm.minimumTopUpAmounts?.default || ""}
                    onChange={(e) => setWalletForm(prev => ({
                      minimumTopUpAmounts: {
                        agent: prev.minimumTopUpAmounts?.agent || 0,
                        super_agent: prev.minimumTopUpAmounts?.super_agent || 0,
                        dealer: prev.minimumTopUpAmounts?.dealer || 0,
                        super_dealer: prev.minimumTopUpAmounts?.super_dealer || 0,
                        default: parseFloat(e.target.value) || 0,
                      }
                    }))}
                    placeholder="10.00"
                  />
                </div>
              </div>

              <Separator />

              <Button
                onClick={handleSaveWalletSettings}
                disabled={updateWalletSettings.isPending}
                className="w-full sm:w-auto"
              >
                {updateWalletSettings.isPending ? "Saving..." : "Save Wallet Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commission Settings */}
        <TabsContent value="commission">
          <Card>
            <CardHeader>
              <CardTitle>Commission Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label>Commission Rates by User Type (%)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentCommission">Agent</Label>
                    <Input
                      id="agentCommission"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={commissionForm.agentCommission || ""}
                      onChange={(e) => setCommissionForm(prev => ({ ...prev, agentCommission: parseFloat(e.target.value) || 0 }))}
                      placeholder="5.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="superAgentCommission">Super Agent</Label>
                    <Input
                      id="superAgentCommission"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={commissionForm.superAgentCommission || ""}
                      onChange={(e) => setCommissionForm(prev => ({ ...prev, superAgentCommission: parseFloat(e.target.value) || 0 }))}
                      placeholder="7.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dealerCommission">Dealer</Label>
                    <Input
                      id="dealerCommission"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={commissionForm.dealerCommission || ""}
                      onChange={(e) => setCommissionForm(prev => ({ ...prev, dealerCommission: parseFloat(e.target.value) || 0 }))}
                      placeholder="10.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="superDealerCommission">Super Dealer</Label>
                    <Input
                      id="superDealerCommission"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={commissionForm.superDealerCommission || ""}
                      onChange={(e) => setCommissionForm(prev => ({ ...prev, superDealerCommission: parseFloat(e.target.value) || 0 }))}
                      placeholder="12.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultCommissionRate">Default Rate</Label>
                    <Input
                      id="defaultCommissionRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={commissionForm.defaultCommissionRate || ""}
                      onChange={(e) => setCommissionForm(prev => ({ ...prev, defaultCommissionRate: parseFloat(e.target.value) || 0 }))}
                      placeholder="1.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerCommission">Customer Commission</Label>
                    <Input
                      id="customerCommission"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={commissionForm.customerCommission || ""}
                      onChange={(e) => setCommissionForm(prev => ({ ...prev, customerCommission: parseFloat(e.target.value) || 0 }))}
                      placeholder="0.5"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <Button
                onClick={handleSaveCommissionSettings}
                disabled={updateCommissionSettings.isPending}
                className="w-full sm:w-auto"
              >
                {updateCommissionSettings.isPending ? "Saving..." : "Save Commission Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label>Telecom Provider API Keys</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mtnApiKey">MTN API Key</Label>
                    <Input
                      id="mtnApiKey"
                      type="password"
                      value={apiForm.mtnApiKey || ""}
                      onChange={(e) => setApiForm(prev => ({ ...prev, mtnApiKey: e.target.value }))}
                      placeholder="Enter MTN API key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telecelApiKey">Telecel API Key</Label>
                    <Input
                      id="telecelApiKey"
                      type="password"
                      value={apiForm.telecelApiKey || ""}
                      onChange={(e) => setApiForm(prev => ({ ...prev, telecelApiKey: e.target.value }))}
                      placeholder="Enter Telecel API key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="airtelTigoApiKey">AirtelTigo API Key</Label>
                    <Input
                      id="airtelTigoApiKey"
                      type="password"
                      value={apiForm.airtelTigoApiKey || ""}
                      onChange={(e) => setApiForm(prev => ({ ...prev, airtelTigoApiKey: e.target.value }))}
                      placeholder="Enter AirtelTigo API key"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">API Endpoint</Label>
                  <Input
                    id="apiEndpoint"
                    type="url"
                    value={apiForm.apiEndpoint || ""}
                    onChange={(e) => setApiForm(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                    placeholder="https://api.telecomsaas.com"
                  />
                </div>
              </div>

              <Separator />

              <Button
                onClick={handleSaveApiSettings}
                disabled={updateApiSettings.isPending}
                className="w-full sm:w-auto"
              >
                {updateApiSettings.isPending ? "Saving..." : "Save API Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
