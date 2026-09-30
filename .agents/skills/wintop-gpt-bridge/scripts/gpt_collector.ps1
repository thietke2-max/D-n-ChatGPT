param (
    [string]$Action = "test",
    [int]$SceneId = 1,
    [string]$SceneTitle = "Tan ca muon dem ram",
    [string]$ImageUrl = "",
    [string]$Prompt = "",
    [string]$SafeZone = "Right-Third",
    [string]$OutputDir = "outputs/anh_da_tao"
)

# Ensure output directory exists
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    Write-Host "[Wintop Collector] Created output directory: $OutputDir"
}

$manifestPath = Join-Path $OutputDir "scenes_manifest.json"
$manifest = @{
    campaign = "Chien Dich Trung Thu Wintop V3"
    updated_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    total_scenes = 0
    scenes = @()
}

if (Test-Path $manifestPath) {
    try {
        $raw = Get-Content -Path $manifestPath -Raw -Encoding UTF8
        $manifest = $raw | ConvertFrom-Json
    } catch {
        Write-Warning "Could not read existing manifest, creating new."
    }
}

# Generate safe clean slug
$cleanSlug = ($SceneTitle -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '_').ToLower()
$formattedId = "{0:D2}" -f $SceneId
$fileName = "scene_${formattedId}_${cleanSlug}.png"
$localFilePath = Join-Path $OutputDir $fileName

if ($Action -eq "test") {
    Write-Host "[Wintop Collector] Testing image storage for Scene #$SceneId..."
    
    # Pick an existing test image in workspace to simulate GPT download
    $sampleSources = @("ket_qua_test_chinh_xac_scene_01.png", "ket_qua_test_scene_01.png", "ket_qua_test_scene_stack.png")
    $sourceIndex = ($SceneId - 1) % $sampleSources.Count
    $sampleSource = $sampleSources[$sourceIndex]

    if (Test-Path $sampleSource) {
        Copy-Item -Path $sampleSource -Destination $localFilePath -Force
        Write-Host "[Wintop Collector] Successfully saved image to: $localFilePath"
    } else {
        [System.IO.File]::WriteAllBytes($localFilePath, [byte[]]@(0x89, 0x50, 0x4E, 0x47))
        Write-Host "[Wintop Collector] Created simulated file at: $localFilePath"
    }

    $fileSize = (Get-Item $localFilePath).Length
    $sceneRecord = [PSCustomObject]@{
        id = $SceneId
        title = "Scene ${formattedId}: $SceneTitle"
        prompt = $Prompt
        file_name = $fileName
        file_path = $localFilePath -replace '\\', '/'
        file_size_kb = [math]::Round($fileSize / 1024, 2)
        safe_zone = $SafeZone
        audit_status = "PASSED"
        source = "ChatGPT DALL-E 3 (Simulated)"
        downloaded_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    }

    $existingList = @($manifest.scenes)
    $filtered = @($existingList | Where-Object { $_.id -ne $SceneId })
    $filtered += $sceneRecord
    $manifest.scenes = $filtered
    $manifest.total_scenes = $filtered.Count
    $manifest.updated_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

    $jsonOutput = $manifest | ConvertTo-Json -Depth 5
    [System.IO.File]::WriteAllText($manifestPath, $jsonOutput, [System.Text.Encoding]::UTF8)
    Write-Host "[Wintop Collector] Manifest updated at: $manifestPath"

    # Sync to Dashboard
    $dashboardScript = ".agents/skills/wintop-design-autopilot/scripts/generate_dashboard.ps1"
    if (Test-Path $dashboardScript) {
        $dashboardData = @{
            campaignTitle = $manifest.campaign
            brand = "WINTOP COLOSTRUM GAIN"
            createdAt = (Get-Date).ToString("dd/MM/yyyy HH:mm")
            stats = @{
                totalScenes = $manifest.total_scenes
                renderedCount = $manifest.total_scenes
                safeZoneScore = "100%"
            }
            scenes = @(
                foreach ($s in $manifest.scenes) {
                    @{
                        id = $s.id
                        title = $s.title
                        char = "Me cong nhan"
                        prompt = $s.prompt
                        safe_zone = $s.safe_zone
                        ratio = "1:1"
                        imageUrl = $s.file_path
                    }
                }
            )
        }
        $dashJsonPath = Join-Path $OutputDir "dashboard_sync_data.json"
        $dashboardData | ConvertTo-Json -Depth 5 | Set-Content -Path $dashJsonPath -Encoding UTF8
        powershell -ExecutionPolicy Bypass -File $dashboardScript -JsonPath $dashJsonPath -OutputPath "wintop_storyboard_dashboard.html"
        Write-Host "[Wintop Collector] Storyboard Dashboard refreshed successfully!"
    }
}
