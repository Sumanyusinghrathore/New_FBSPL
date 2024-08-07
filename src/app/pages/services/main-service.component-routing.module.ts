import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainServiceComponent } from './main-service.component';
import { AccountingBookkeepingComponent } from './accounting-bookkeeping/accounting-bookkeeping.component';
import { PayableManagementComponent } from './accounting-bookkeeping/Sub-Pages/payable-management/payable-management.component';
import { RecievableManagementComponent } from './accounting-bookkeeping/Sub-Pages/recievable-management/recievable-management.component';
import { FinancialReportingComponent } from './accounting-bookkeeping/Sub-Pages/financial-reporting/financial-reporting.component';
import { PayrollProcessingComponent } from './accounting-bookkeeping/Sub-Pages/payroll-processing/payroll-processing.component';
import { ReconciliationComponent } from './accounting-bookkeeping/Sub-Pages/reconciliation/reconciliation.component';
import { GeneralLedgerAccountingComponent } from './accounting-bookkeeping/Sub-Pages/general-ledger-accounting/general-ledger-accounting.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { DigitalMarketingComponent } from './digital-marketing/digital-marketing.component';
import { ServicesComponent } from './Ecommerce/services.component';
import { PreSalesSupport } from './Ecommerce/Sub-service/pre-sales-support/pre-sales-support.component';
import { OrderManagement } from './Ecommerce/Sub-service/Order Management/order-management.component';
import { CatalogManagement } from './Ecommerce/Sub-service/Catalog Management/catalog-management.component';
import { InventoryManagement } from './Ecommerce/Sub-service/Inventory Management/inventory-management.component';
import { DataManagement } from './Ecommerce/Sub-service/Data Management/data-management.component';
import { InsuranceAgencyOptimizationComponent } from './insurance-agency-optimization/insurance-agency-optimization.component';
import { ServiceRPOComponent } from './service-rpo/service-rpo.component';
import { PolicyProcessingComponent } from './Insurance/sub-service-page/policy-processing/policy-processing.component';
import { newBusinessComponent } from './Insurance/sub-service-page/new-business/new-business.component';
import { claimManagement } from './Insurance/sub-service-page/claim-management/claim-management.component';
import { LogisticManagement } from './Ecommerce/Sub-service/Logistic Management/logistic-management.component';
import { Insurance } from './Insurance/Insurance.component';
import { DataAnnotationComponent } from './data-annotation/data-annotation.component';
const routes: Routes = [
  {
    path: 'accounting-bookkeeping-services',
    component: AccountingBookkeepingComponent,
  },
  {
    path: 'accounts-payable-management',
    component: PayableManagementComponent,
  },
  {
    path: 'accounts-receivable-management',
    component: RecievableManagementComponent,
  },
  {
    path: 'accounting-and-financial-reporting-services',
    component: FinancialReportingComponent,
  },
  {
    path: 'payroll-processing-services',
    component: PayrollProcessingComponent,
  },
  {
    path: 'accounts-reconciliation-services',
    component: ReconciliationComponent,
  },
  {
    path: 'general-ledger-accounting-services',
    component: GeneralLedgerAccountingComponent,
  },
  { path: 'customer-support-outsourcing', component: CustomerSupportComponent },
  { path: 'digital-marketing', component: DigitalMarketingComponent },
  { path: 'e-commerce-outsourcing-services', component: ServicesComponent },
  { path: 'e-commerce-pre-sales-support', component: PreSalesSupport },
  { path: 'e-commerce-order-management', component: OrderManagement },
  { path: 'e-commerce-catalog-management', component: CatalogManagement },
  { path: 'e-commerce-inventory-management', component: InventoryManagement },
  { path: 'e-commerce-data-management', component: DataManagement },
  { path: 'e-commerce-logistic-management', component: LogisticManagement },
  {
    path: 'insurance-agency-optimization-services',
    component: InsuranceAgencyOptimizationComponent,
  },
  {
    path: 'recruitment-process-outsourcing-services',
    component: ServiceRPOComponent,
  },
  { path: 'insurance-bpo-outsourcing', component: Insurance },
  { path: 'insurance-policy-processing', component: PolicyProcessingComponent },
  { path: 'insurance-new-business-servicing', component: newBusinessComponent },
  { path: 'insurance-claim-management', component: claimManagement },
  { path: 'data-annotation-services', component: DataAnnotationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
