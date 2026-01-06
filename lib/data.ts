import { supabaseServer } from './supabaseClient'
import { CarModel, Variant, DealerInfo } from '@/types'
import { BYD_MODELS } from '@/constants'
import { dealerData as defaultDealerData } from '@/data/dealer'

/**
 * Fetch pricing data from Supabase and merge with static model data
 * Used for SSG/ISR at build time and revalidation
 */
export async function getModelsWithPricing(): Promise<CarModel[]> {
    // 100% SSG: Return static data directly, bypassing Supabase.
    // This matches the user's request to use "data ts model kendaraannya saja".
    return BYD_MODELS;
}

/**
 * Get a single model with pricing by ID
 */
export async function getModelById(id: string): Promise<CarModel | null> {
    const models = await getModelsWithPricing()
    return models.find(m => m.id === id) || null
}

/**
 * Get a specific variant with pricing
 */
export async function getVariant(modelId: string, variantId: string): Promise<{ model: CarModel, variant: Variant } | null> {
    const model = await getModelById(modelId)
    if (!model) return null

    const variant = model.variants.find(v => v.id === variantId)
    if (!variant) return null

    return { model, variant }
}

/**
 * Fetch dealer info from Supabase
 * Used for SSG/ISR at build time
 */
export async function getDealerInfo(): Promise<DealerInfo> {
    // 100% SSG: Return static dealer data directly.
    return defaultDealerData;
}

/**
 * Get all model IDs for static path generation
 */
export function getAllModelIds(): string[] {
    return BYD_MODELS.map(m => m.id)
}

/**
 * Get all model + variant combinations for static path generation
 */
export function getAllVariantPaths(): { modelId: string; variantId: string }[] {
    const paths: { modelId: string; variantId: string }[] = []

    BYD_MODELS.forEach(model => {
        model.variants.forEach(variant => {
            paths.push({
                modelId: model.id,
                variantId: variant.id
            })
        })
    })

    return paths
}
