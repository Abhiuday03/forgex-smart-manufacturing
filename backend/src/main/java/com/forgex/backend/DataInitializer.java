package com.forgex.backend;

import com.forgex.backend.entity.Product;
import com.forgex.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner loadProducts(ProductRepository repository) {

        return args -> {

            if (repository.count() > 0) {
                return;
            }

            Product gearAssemblies = new Product();

            gearAssemblies.setName("Industrial Gear Assemblies");
            gearAssemblies.setSlug("industrial-gear-assemblies");
            gearAssemblies.setCategory("Power Transmission");
            gearAssemblies.setShortDescription(
                    "Precision-manufactured gear assemblies designed for high-load industrial applications."
            );
            gearAssemblies.setDescription(
                    "Industrial gear assemblies manufactured for reliable power transmission, "
                    + "high-load operation, and demanding mechanical environments."
            );
            gearAssemblies.setMaterial(
                    "Alloy Steel"
            );
            gearAssemblies.setManufacturingProcess(
                    "CNC Machining, Heat Treatment, Gear Hobbing"
            );
            gearAssemblies.setTolerance(
                    "Up to ±0.02 mm"
            );
            gearAssemblies.setApplications(
                    "Automotive, Heavy Machinery, Manufacturing"
            );
            gearAssemblies.setIndustries(
                    "Automotive, Industrial Equipment, Manufacturing"
            );

            repository.save(gearAssemblies);


            Product hydraulicValves = new Product();

            hydraulicValves.setName("Hydraulic Valve Systems");
            hydraulicValves.setSlug("hydraulic-valve-systems");
            hydraulicValves.setCategory("Fluid Control");
            hydraulicValves.setShortDescription(
                    "Reliable hydraulic valve systems engineered for accurate flow and pressure control."
            );
            hydraulicValves.setDescription(
                    "Precision hydraulic valve systems designed to provide dependable "
                    + "flow regulation and pressure control in industrial equipment."
            );
            hydraulicValves.setMaterial(
                    "Stainless Steel"
            );
            hydraulicValves.setManufacturingProcess(
                    "CNC Machining, Grinding, Pressure Testing"
            );
            hydraulicValves.setTolerance(
                    "Up to ±0.01 mm"
            );
            hydraulicValves.setApplications(
                    "Construction, Industrial Automation, Heavy Equipment"
            );
            hydraulicValves.setIndustries(
                    "Construction, Infrastructure, Industrial Automation"
            );

            repository.save(hydraulicValves);


            Product shafts = new Product();

            shafts.setName("Precision Shaft Components");
            shafts.setSlug("precision-shaft-components");
            shafts.setCategory("Machined Components");
            shafts.setShortDescription(
                    "High-precision shafts manufactured for demanding mechanical and rotating applications."
            );
            shafts.setDescription(
                    "Precision-engineered shaft components manufactured for rotating machinery, "
                    + "robotics, automotive systems, and other demanding applications."
            );
            shafts.setMaterial(
                    "Carbon Steel / Alloy Steel"
            );
            shafts.setManufacturingProcess(
                    "CNC Turning, Grinding, Heat Treatment"
            );
            shafts.setTolerance(
                    "Up to ±0.01 mm"
            );
            shafts.setApplications(
                    "Automotive, Robotics, Industrial Machinery"
            );
            shafts.setIndustries(
                    "Automotive, Robotics, Industrial Machinery"
            );

            repository.save(shafts);


            Product fastenerKits = new Product();

            fastenerKits.setName("Structural Fastener Kits");
            fastenerKits.setSlug("structural-fastener-kits");
            fastenerKits.setCategory("Industrial Hardware");
            fastenerKits.setShortDescription(
                    "Industrial-grade fastening solutions designed for structural and heavy-duty applications."
            );
            fastenerKits.setDescription(
                    "Heavy-duty structural fastener kits designed for reliable assembly "
                    + "in construction, infrastructure, and engineering applications."
            );
            fastenerKits.setMaterial(
                    "High-Strength Carbon Steel"
            );
            fastenerKits.setManufacturingProcess(
                    "Cold Forging, Thread Rolling, Surface Treatment"
            );
            fastenerKits.setTolerance(
                    "According to applicable standards"
            );
            fastenerKits.setApplications(
                    "Construction, Infrastructure, Engineering"
            );
            fastenerKits.setIndustries(
                    "Construction, Infrastructure, Engineering"
            );

            repository.save(fastenerKits);

            System.out.println("ForgeX products initialized successfully.");
        };
    }
}